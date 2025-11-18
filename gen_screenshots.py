from pathlib import Path
from PIL import Image

output = Path(__file__).resolve().parent / "screenshots"
output.mkdir(exist_ok=True)

colors = {
    "problematic.png": (191, 28, 44),
    "fixed.png": (15, 123, 255),
}

for name, rgb in colors.items():
    image = Image.new("RGB", (480, 320), rgb)
    image.save(output / name)