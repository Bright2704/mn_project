'use client';

import React, { useState, useEffect } from 'react';

const LineLoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // โหลด LIFF SDK
    const script = document.createElement('script');
    script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
    script.onload = () => {
      initializeApp();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ฟังก์ชันเริ่มต้น LIFF
  const initializeApp = () => {
    window.liff.init({ liffId: '2006545984-bnyRkq1E' })
      .then(() => {
        if (window.liff.isLoggedIn()) {
          getProfile();
        } else {
          window.liff.login();
        }
      })
      .catch((err: any) => {
        console.error('LIFF initialization failed', err);
        setLoading(false);
      });
  };

  // ฟังก์ชันดึงโปรไฟล์ผู้ใช้
  const getProfile = () => {
    window.liff.getProfile()
      .then((profile: any) => {
        setUserProfile(profile);
        setIsLoggedIn(true);
        setLoading(false);
        sendUserDataToServer(profile);
      })
      .catch((err: any) => {
        console.error('Failed to get user profile', err);
        setLoading(false);
      });
  };
  

  const logout = () => {
    window.liff.logout();
    window.location.reload();
  };

  if (loading) {
    return <p>กำลังล็อกอิน...</p>;
  }

  const sendUserDataToServer = (profile) => {
    if (!profile || !profile.userId) {
      console.error('Invalid user data');
      return;
    }
  
    fetch('/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail, // อีเมลของผู้ใช้
        password: userPassword, // รหัสผ่านของผู้ใช้
        lineId: profile.userId, // ส่ง lineId ไป
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Server Response:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  

  return (
    <div>
      <h1>Login with LINE</h1>
      {!isLoggedIn ? (
        <button onClick={initializeApp}>Login with Line</button>
      ) : (
        <>
          <h2>User Profile</h2>
          <p><strong>Display Name:</strong> {userProfile.displayName}</p>
          <p><strong>Status Message:</strong> {userProfile.statusMessage}</p>
          <p><strong>User ID:</strong> {userProfile.userId}</p>
          <p><strong>Language:</strong> {userProfile.language}</p>
          <img src={userProfile.pictureUrl} alt="User Profile" />
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default LineLoginPage;
