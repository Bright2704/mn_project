'use client';

import React, { useState, useEffect } from 'react';

const LineLoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);  // สถานะของ login สำเร็จ

  useEffect(() => {
    if (loading) {
      const script = document.createElement('script');
      script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
      script.onload = () => {
        initializeApp();
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [loading]);

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

  const getProfile = () => {
    window.liff.getProfile()
      .then((profile: any) => {
        setUserProfile(profile);
        setIsLoggedIn(true);
        setLoading(false);
        sendUserDataToServer(profile);
        setLoginSuccess(true);  // ตั้งค่า login สำเร็จ
      })
      .catch((err: any) => {
        console.error('Failed to get user profile', err);
        setLoading(false);
      });
  };

  const sendUserDataToServer = (profile) => {
    fetch('http://localhost:5001/api/users/update-line-id', {  // URL ที่เชื่อมโยงกับเซิร์ฟเวอร์
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lineId: profile.userId,  // ส่ง Line userId
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server Response:', data);
        // ทำการกระทำอื่นๆ เช่นแสดงข้อความ หรือรีเฟรช
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const logout = () => {
    window.liff.logout();
    window.location.reload();
  };

  if (loading) {
    return <p>กำลังล็อกอิน...</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {loginSuccess && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 9999,
          }}
        >
          Login สำเร็จ
        </div>
      )}

      {!isLoggedIn ? (
        <button
          onClick={() => setLoading(true)}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login with Line
        </button>
      ) : (
        <>
          <h2>User Profile</h2>
          <p><strong>Display Name:</strong> {userProfile.displayName}</p>
          <p><strong>Status Message:</strong> {userProfile.statusMessage}</p>
          <p><strong>User ID:</strong> {userProfile.userId}</p>
          <p><strong>Language:</strong> {userProfile.language}</p>
          <img src={userProfile.pictureUrl} alt="User Profile" />
          <button
            onClick={logout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default LineLoginPage;
