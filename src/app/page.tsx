'use client'

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(error => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }
  }, []);
  const handleClick = async () => {
    try {
      console.log('Requesting Bluetooth Device...');
      const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['battery_service']
      });

      console.log('Connecting to GATT Server...');
      const server = await device.gatt.connect();

      console.log('Getting Battery Service...');
      const service = await server.getPrimaryService('battery_service');

      console.log('Getting Battery Level Characteristic...');
      const characteristic = await service.getCharacteristic('battery_level');

      console.log('Reading Battery Level...');
      const value = await characteristic.readValue();
      const batteryLevel = value.getUint8(0);
      console.log(`Battery Level: ${batteryLevel}%`);
  } catch (error) {
      console.error('Error:', error);
  }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Demo pwa app</h1>
      <button className="btn bg-blue-500 px-4 py-2 text-white" onClick={handleClick} >Bluetooth</button>
    </main>
  );
}
