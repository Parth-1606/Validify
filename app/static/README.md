# Background Image Instructions

To add your background image to the login page:

1. Place your image file in this `app/static/` folder
2. Name it `background.jpg` (or `.png`, `.jpeg`, `.webp`)
3. The image will automatically appear as the background

**Supported formats:** `.jpg`, `.jpeg`, `.png`, `.webp`

**Recommended size:** 1920x1080 or larger for best quality

**Note:** If you want to use a different filename, update line 88 in `auth.py`:
```python
url('app/static/background.jpg')  # Change to your image filename
```
