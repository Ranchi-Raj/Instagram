from fastapi import FastAPI, Form, UploadFile, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import instaloader
import os

app = FastAPI()

# CORS to allow frontend from different origin (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/download-dp")
async def download_instagram_dp(username: str = Form(...)):
    loader = instaloader.Instaloader()
    try:
        loader.download_profile(username, profile_pic_only=True)

        folder_path = os.path.join(os.getcwd(), username)
        for file in os.listdir(folder_path):
            if file.endswith(".jpg"):
                return FileResponse(
                    path=os.path.join(folder_path, file),
                    filename=f"{username}_dp.jpg",
                    media_type='image/jpeg'
                )
        return JSONResponse({"error": "Profile picture not found"}, status_code=404)

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
