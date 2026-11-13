from __future__ import annotations

import json
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from fish_voice import FishVoiceError, load_env, voice_from_env

ROOT = Path(__file__).resolve().parent
PORT = 8080


class Troll(SimpleHTTPRequestHandler):
    def __init__(self, *args, voice=None, **kwargs):
        self._voice = voice
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path.split("?", 1)[0] != "/api/speak":
            self.send_error(404, "Not found")
            return
        try:
            if self._voice is None:
                raise FishVoiceError("voice: Fish Audio not configured. Set FISH_API_KEY")
            text, reference_id = self._read_speak_text()
            audio = self._voice.synthesize(text, reference_id)
        except FishVoiceError as err:
            status = 400 if str(err).startswith("validation:") else 502
            self._send_json(status, {"error": str(err)})
            return
        except ValueError as err:
            self._send_json(400, {"error": str(err)})
            return
        self.send_response(200)
        self.send_header("Content-Type", "audio/mpeg")
        self.send_header("Content-Length", str(len(audio)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(audio)

    def _read_speak_text(self):
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0 or length > 8192:
            raise ValueError("Speak request body is missing or too large")
        payload = json.loads(self.rfile.read(length).decode("utf-8"))
        if not isinstance(payload, dict):
            raise ValueError("Speak request needs a JSON object")
        text = payload.get("text")
        if not isinstance(text, str) or not text.strip():
            raise ValueError("validation: text must not be empty")
        reference_id = payload.get("reference_id")
        if reference_id is not None and not isinstance(reference_id, str):
            raise ValueError("validation: reference_id must be a string")
        return text, reference_id

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), format % args))


def main():
    load_env(ROOT / ".env")
    try:
        voice = voice_from_env(ROOT / "assets" / "voice" / "clips")
    except FishVoiceError:
        voice = None
    handler = lambda *args, **kwargs: Troll(*args, voice=voice, **kwargs)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    print(f"Troll running at http://127.0.0.1:{PORT}/")
    print("Allow popups. Fish voice is served from /api/speak")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped")


if __name__ == "__main__":
    main()
