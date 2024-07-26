import { useState, useEffect } from "react";

export default function LocationTest() {
  const [permissionStatus, setPermissionStatus] = useState(<span className="text-gray-300">未請求</span>);
  const [latlon, setLatlon] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    requestLocation()
  }, []);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 成功回調
          setPermissionStatus(<span className="text-blue-500">允許</span>);
          setLatlon(<p className="text-base">{position.coords.latitude}, {position.coords.longitude}</p>);
          console.log(
            "位置:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          // 錯誤回調
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionStatus(<span className="text-red-500">不允許</span>);
          }

          setLatlon(null);
        }
      );
    }
  };

  if (!isSupported) {
    return <div>您的瀏覽器不支持地理位置功能。</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* <button className="bg-black font-bold text-white px-4 py-2 rounded-lg cursor-pointer" onClick={requestLocation}>請求位置許可</button> */}
      <p className="mt-10">許可狀態</p>
      <p className="mt-2 text-4xl">{permissionStatus}</p>
      {latlon}
    </div>
  );
}
