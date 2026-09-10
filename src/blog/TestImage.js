import React, { useState } from 'react';

function TestImage() {
    // Giả lập dữ liệu nhận từ API (mỗi comment có 1 tên ảnh khác nhau)
    const [testImageName, setTestImageName] = useState("man-two.jpg");

    // Đường dẫn 1: Theo đúng public/upload/user/avatar/
    const url1 = `http://localhost/laravel8/public/upload/user/avatar/${testImageName}`;

    // Đường dẫn 2: Nếu Laravel của bạn lưu trong storage
    const url2 = `http://localhost/laravel8/public/storage/upload/user/avatar/${testImageName}`;

    return (
        <div style={{ padding: '15px', border: '2px dashed #ff9800', margin: '15px 0', background: '#fff3e0' }}>
            <h4>Kiểm tra hiển thị ảnh động từ Backend</h4>
            
            <label style={{ display: 'block', marginBottom: '10px' }}>
                Đổi tên file ảnh từ DB để test: 
                <input 
                    type="text" 
                    value={testImageName} 
                    onChange={(e) => setTestImageName(e.target.value)}
                    style={{ marginLeft: '10px', padding: '4px' }}
                />
            </label>

            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                <div>
                    <p><b>Cách 1 (Thư mục public/upload):</b></p>
                    <small>{url1}</small> <br />
                    <img 
                        src={url1} 
                        alt="Url 1" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid #000' }}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=URL1+Loi"; }}
                    />
                </div>

                <div>
                    <p><b>Cách 2 (Thư mục public/storage):</b></p>
                    <small>{url2}</small> <br />
                    <img 
                        src={url2} 
                        alt="Url 2" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid #000' }}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=URL2+Loi"; }}
                    />
                </div>
            </div>
        </div>
    );
}

export default TestImage;