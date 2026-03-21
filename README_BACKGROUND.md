# Adding Background Image to Login Page

To add your background image to the login page:

1. Place your image file in the project root directory
2. Name it `background.jpg` (or update the filename in `auth.py` line 87)
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

The image will be displayed as a full-screen background with:
- A semi-transparent dark overlay for better text readability
- A glassmorphism effect on the login container (semi-transparent white with blur)
- All credentials and form elements positioned on top

If you want to use a different image filename, update this line in `auth.py`:
```python
url('background.jpg')
```

Change it to your image filename, for example:
```python
url('my-background.png')
```
