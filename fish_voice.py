from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

FISH_TTS_URL = "https://api.fish.audio/v1/tts"
MAX_CHARS = 500


class FishVoiceError(Exception):
    pass


class FishAudioSynthesizer:
    def __init__(self, api_key, voice_id, model, cache_dir):
        self._api_key = api_key
        self._voice_id = voice_id or ""
        self._model = model or "s2.1-pro-free"
        self._cache_dir = Path(cache_dir)
        self._cache_dir.mkdir(parents=True, exist_ok=True)

    @classmethod
    def from_env(cls, cache_dir):
        return cls.from_env_with_override(None, cache_dir)

    @classmethod
    def from_env_with_override(cls, reference_id, cache_dir):
        api_key = os.environ.get("FISH_API_KEY", "").strip()
        if not api_key:
            return None
        override = (reference_id or "").strip()
        voice_id = override or os.environ.get("FISH_VOICE_ID", "")
        model = os.environ.get("FISH_MODEL", "s2.1-pro-free")
        return cls(api_key, voice_id, model, cache_dir)

    def synthesize(self, text, reference_id=None):
        cleaned = (text or "").strip()
        if not cleaned:
            raise FishVoiceError("validation: text must not be empty")
        if len(cleaned) > MAX_CHARS:
            raise FishVoiceError("validation: text exceeds 500 characters (tags and new lines included)")

        voice_id = (reference_id or "").strip() or self._voice_id
        cached = self._read_cache(cleaned, voice_id)
        if cached is not None:
            return cached

        audio = self._request(cleaned, voice_id)
        self._write_cache(cleaned, voice_id, audio)
        return audio

    def clip_filename(self, text, reference_id=None):
        voice_id = (reference_id or "").strip() or self._voice_id
        digest = hashlib.sha256(
            f"{self._model}|{voice_id}|{text}".encode("utf-8")
        ).hexdigest()
        return f"{digest}.mp3"

    def _cache_path(self, text, voice_id):
        return self._cache_dir / self.clip_filename(text, voice_id)

    def _read_cache(self, text, voice_id):
        path = self._cache_path(text, voice_id)
        if not path.is_file():
            return None
        return path.read_bytes()

    def _write_cache(self, text, voice_id, audio):
        self._cache_path(text, voice_id).write_bytes(audio)

    def _payload(self, text, voice_id):
        if not voice_id.strip():
            return {"text": text, "format": "mp3"}
        return {"text": text, "reference_id": voice_id, "format": "mp3"}

    def _request(self, text, voice_id):
        body = json.dumps(self._payload(text, voice_id)).encode("utf-8")
        request = Request(
            FISH_TTS_URL,
            data=body,
            method="POST",
            headers={
                "Authorization": f"Bearer {self._api_key}",
                "Content-Type": "application/json",
                "model": self._model,
            },
        )
        try:
            with urlopen(request, timeout=30) as response:
                audio = response.read()
        except HTTPError as err:
            detail = err.read().decode("utf-8", errors="replace")[:300]
            raise FishVoiceError(f"Fish Audio error {err.code}: {detail}") from err
        except URLError as err:
            raise FishVoiceError(f"Fish Audio request failed: {err.reason}") from err

        if not audio:
            raise FishVoiceError("Fish Audio returned an empty audio body")
        return audio


def load_env(env_path):
    path = Path(env_path)
    if not path.is_file():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def voice_from_env(cache_dir):
    synthesizer = FishAudioSynthesizer.from_env(cache_dir)
    if synthesizer is None:
        raise FishVoiceError("voice: Fish Audio not configured. Set FISH_API_KEY")
    return synthesizer
