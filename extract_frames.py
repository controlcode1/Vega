import cv2
import os
import shutil

video_path = "14707اااااااااااااااااااااا88258_pin.mp4"
output_dir = "public/frames"

# Clear old frames first
if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error opening video file")
    exit(1)

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(f"Total frames: {total_frames}, FPS: {fps}, Size: {width}x{height}")

frame_index = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    output_path = os.path.join(output_dir, f"frame_{frame_index:04d}.jpg")
    # Quality 95 = near-lossless, maximum visual fidelity
    cv2.imwrite(output_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
    frame_index += 1

    if frame_index % 50 == 0:
        print(f"  Saved {frame_index}/{total_frames} frames...")

cap.release()
print(f"\nDone. Saved {frame_index} frames at full {width}x{height} resolution to {output_dir}/")
