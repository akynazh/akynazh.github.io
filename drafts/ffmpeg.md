## 显示可用设备

```
ffmpeg -list_devices true -f dshow -i dummy
```

## 录制声音

```
ffmpeg -f dshow -i audio="麦克风阵列 (Realtek(R) Audio)" -acodec mp3 audio.mp3
```

## 录制摄像头

```
ffmpeg -f dshow -i video="Integrated Camera" camera.mp4
```

## 同时录制

```
ffmpeg -f dshow -i video="Integrated Camera":audio="麦克风阵列 (Realtek(R) Audio)" video_and_audio.mp4
```