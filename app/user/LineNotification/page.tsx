'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LineLoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<string>(''); // ใช้สถานะเดียว
  const [userIdFromServer, setUserIdFromServer] = useState<string>(''); // เก็บ user_id ที่ดึงมา
  const [userData, setUserData] = useState<any>([]);

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
        checkLoginStatus();
      })
      .catch((err: any) => {
        console.error('LIFF initialization failed', err);
        setLoading(false);
        setLoginStatus('failed');
      });
  };

  const checkLoginStatus = () => {
    if (window.liff.isLoggedIn()) {
      getProfile();
    } else {
      window.liff.login();
    }
  };

  const getProfile = () => {
    window.liff.getProfile()
      .then((profile: any) => {
        setUserProfile(profile);
        console.log("line data", profile)
        setIsLoggedIn(true);
        setLoading(false);
        updateUserLineId();
        setLoginStatus('success');  // เมื่อ login สำเร็จ
      })
      .catch((err: any) => {
        console.error('Failed to get user profile', err);
        setLoading(false);
        setLoginStatus('failed');
      });
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/users/${userData}`);
      if (response.status === 200) {
        const data = response.data;
        setUserData(data);
        console.log("fetch User Data", data)
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const updateUserLineId = async () => {
    console.log("Patch");
    try {
      // ตรวจสอบว่า userIdFromServer และ userProfile.userId มีค่าที่ถูกต้อง
      const response = await axios.patch(
        `http://localhost:5001/users/update/${userIdFromServer}`, // ส่ง userId ผ่าน URL
        {
          line_id: userProfile.userId // ส่ง line_id ใน request body
        }
      );
  
      if (response.status === 200) {
        console.log('User line ID updated successfully:', response.data);
      }
    } catch (error) {
      console.error('Error updating user line ID:', error);
    }
  };
  
  // ฟังก์ชันสำหรับดึง user ID จากเซิร์ฟเวอร์
  const getUserId = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/session');
      const data = await response.json();
      setUserIdFromServer(data.user.user_id);
      console.log(data)
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
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
      {loginStatus === 'success' && (
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

      {loginStatus === 'failed' && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 9999,
          }}
        >
          Login ล้มเหลว
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
          <p><strong>Line User ID:</strong> {userProfile.userId}</p>
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

      {/* ปุ่มสำหรับเรียกใช้ get-user-id */}
      <button
        onClick={fetchUserData}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Get User By ID
      </button>
      <button
        onClick={getUserId}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Get User ID
      </button>
      <button
        onClick={() => { updateUserLineId(); }}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Update Line Id
      </button>


      {userIdFromServer && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>User ID from Server:</strong> {userIdFromServer}</p>
        </div>
      )}
    </div>
  );
};

export default LineLoginPage;
