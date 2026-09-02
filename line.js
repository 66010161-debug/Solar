const express = require('express');
const line = require('@line/bot-sdk');
const path = require('path');

const app = express();

// ดึงค่า Config จาก Environment Variables บน Cloud หรือใช้ค่าสำรอง
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '9ZvIyvQIuiFnpR8MX7HlyO5tFahUu25CB+PKvKZQR66xtUlsrHdyHdB6eDbxoQLztsJ2mSKLJuKyzRp2yzbJROlLtY73R+YvRk3yRnTf+Nbp3ry0B4P7QqjTz6J6Z5LF+X/FG1zyZHPonBRRH6K5rAdB04t89/1O/w1cDnyilFU=',
    channelSecret: process.env.CHANNEL_SECRET || 'd0bded7d9530dfba2e9cda97afd06ac1'
};

const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: config.channelAccessToken
});

// เปิดให้ระบบเรียกใช้ไฟล์รูปภาพในโฟลเดอร์ public ได้โดยตรง
app.use(express.static(path.join(__dirname, 'public')));

// Route สำหรับส่งรูปภาพ Imagemap
app.use('/imagemap1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'line2.png'), (err) => {
        if (err) {
            console.error('❌ หาไฟล์ line2.png ไม่เจอ:', err.message);
            res.status(404).send('Image not found');
        }
    });
});

app.use('/imagemap2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'line3.png'), (err) => {
        if (err) {
            console.error('❌ หาไฟล์ line3.png ไม่เจอ:', err.message);
            res.status(404).send('Image not found');
        }
    });
});

app.use('/imagemap3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'line4.png'), (err) => {
        if (err) {
            console.error('❌ หาไฟล์ line4.png ไม่เจอ:', err.message);
            res.status(404).send('Image not found');
        }
    });
});

// Webhook รองรับคำขอจาก LINE
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvents))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

function handleEvents(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    if (event.replyToken === '00000000000000000000000000000000' || event.replyToken === 'ffffffffffffffffffffffffffffffff') {
        return Promise.resolve(null);
    }

    const text = event.message.text.trim();
    console.log(`[LOG] ข้อความที่เข้ามา: "${text}"`);

    // ดึง URL หลักจาก Environment Variable บน Render (หากไม่มีจะใช้ URL ของโปรเจกต์คุณ)
    const BASE_URL = process.env.SERVER_URL || 'https://my-linebot-app-suyh.onrender.com';

    // --------------------------------------------------------
    // 🔹 คีย์เวิร์ดที่ 1: "ช่องทางติดตาม" -> ส่งรูปที่ 1 (line2.png)
    // --------------------------------------------------------
    if (text === 'ช่องทางติดตาม') {
        console.log('[LOG] 🚀 เจอคำว่า "ช่องทางติดตาม" -> ส่ง Imagemap รูปที่ 1');
        return client.replyMessage({
            replyToken: event.replyToken,
            messages: [
                {
                    "type": "imagemap",
                    "baseUrl": `${BASE_URL}/imagemap1?v=1`,
                    "altText": "ช่องทางติดตาม",
                    "baseSize": { "width": 1040, "height": 1040 },
                    "actions": [
                        { "type": "uri", "area": { "x": 131, "y": 131, "width": 190, "height": 195 }, "linkUri": "https://www.facebook.com/onnexenergy?locale=th_TH" },
                        { "type": "uri", "area": { "x": 718, "y": 135, "width": 192, "height": 188 }, "linkUri": "https://www.linkedin.com/in/onnex-by-scg-energy-services-and-consulting/" },
                        { "type": "uri", "area": { "x": 122, "y": 714, "width": 208, "height": 203 }, "linkUri": "https://www.tiktok.com/@onnexbyscg" },
                        { "type": "uri", "area": { "x": 717, "y": 713, "width": 199, "height": 202 }, "linkUri": "https://www.onnexbyscg.com/" }
                    ]
                }
            ]
        });
    }

    // --------------------------------------------------------
    // 🔹 คีย์เวิร์ดที่ 2: "ปัญหาที่พบได้บ่อย" -> ส่งรูปที่ 2 (line3.png)
    // --------------------------------------------------------
    else if (text === 'ปัญหาที่พบได้บ่อย') {
        console.log('[LOG] 🚀 เจอคำว่า "ปัญหาที่พบได้บ่อย" -> ส่ง Imagemap รูปที่ 2');
        return client.replyMessage({
            replyToken: event.replyToken,
            messages: [
                {
                    "type": "imagemap",
                    "baseUrl": `${BASE_URL}/imagemap2?v=1`,
                    "altText": "เมนูที่ 2",
                    "baseSize": { "width": 1040, "height": 1291 },
                    "actions": [
                        { "type": "uri", "area": { "x": 78, "y": 156, "width": 883, "height": 252 }, "linkUri": "https://www.facebook.com/reel/1686468745968609" },
                        { "type": "uri", "area": { "x": 82, "y": 435, "width": 876, "height": 235 }, "linkUri": "https://www.facebook.com/share/v/1CAXmR3obs/" },
                        { "type": "uri", "area": { "x": 78, "y": 701, "width": 885, "height": 235 }, "linkUri": "https://eversun.co.th/content/why-solar-produces-less-than-expected/" },
                        { "type": "message", "area": { "x": 78, "y": 962, "width": 883, "height": 238 }, "text": "กดที่ปรึกษาเจ้าหน้าที่" }
                    ]
                }
            ]
        });
    }

    else if (text === 'แจ้งซ่อม') {
        console.log('[LOG] 🚀 เจอคำว่า "แจ้งซ่อม" -> ส่ง Imagemap รูปที่ 3');
        return client.replyMessage({
            replyToken: event.replyToken,
            messages: [
                {
                    "type": "imagemap",
                    "baseUrl": `${BASE_URL}/imagemap3?v=1`,
                    "altText": "เมนูที่ 3",
                    "baseSize": { "width": 1040, "height": 1291 },
                    "actions": [
                        { "type": "message", "area": { "x": 74, "y": 160, "width": 889, "height": 248 }, "text": "ซ่อม/เปลี่ยนแผงโซลาร์" },
                        { "type": "message", "area": { "x": 80, "y": 436, "width": 881, "height": 238 }, "text": "ซ่อมรอยรั่วซึมหลังคา" },
                        { "type": "message", "area": { "x": 82, "y": 697, "width": 879, "height": 243 }, "text": "ล้างแผง/เช็คสภาพแผง" },
                        { "type": "message", "area": { "x": 82, "y": 963, "width": 881, "height": 239 }, "text": "กดที่ปรึกษาเจ้าหน้าที่" }
                    ]
                }
            ]
        });
    }

    // --------------------------------------------------------
    // ⛔ พิมพ์คำอื่น -> ไม่ตอบกลับ
    // --------------------------------------------------------
    else {
        console.log('[LOG] ⛔ ไม่ตรงกับคีย์เวิร์ดใดๆ -> ไม่ตอบกลับ');
        return Promise.resolve(null);
    }
}

app.get('/', (req, res) => res.send('Server is running 24/7'));

// ใช้ Dynamic Port สำหรับ Render / Cloud (แก้ปัญหา deploy แล้วค้าง)
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));