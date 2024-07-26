import { useState, useEffect } from "react";

export default function LocationTest() {
  const [permissionStatus, setPermissionStatus] = useState("未請求");
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setIsSupported(false);
    }
  }, []);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 成功回調
          alert('允許');
          setPermissionStatus("允許");
          console.log(
            "位置:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          // 錯誤回調
          alert('不允許');
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionStatus("不允許");
          }
        }
      );
    }
  };

  if (!isSupported) {
    return <div>您的瀏覽器不支持地理位置功能。</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>位置請求測試</h1>
      <button className="bg-black font-bold text-white px-4 py-2 rounded-lg" onClick={requestLocation}>請求位置許可</button>
      <p>許可狀態: {permissionStatus}</p>
    </div>
  );
}
