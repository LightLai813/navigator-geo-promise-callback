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
          setPermissionStatus("允許");
          console.log(
            "位置:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          // 錯誤回調
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
    <div>
      <h1>位置請求測試</h1>
      <button onClick={requestLocation}>請求位置許可</button>
      <p>許可狀態: {permissionStatus}</p>
    </div>
  );
}
