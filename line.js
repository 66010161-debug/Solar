const express = require('express');
const line = require('@line/bot-sdk');
const path = require('path');

const app = express();

const config = {
    channelAccessToken: '9ZvIyvQIuiFnpR8MX7HlyO5tFahUu25CB+PKvKZQR66xtUlsrHdyHdB6eDbxoQLztsJ2mSKLJuKyzRp2yzbJROlLtY73R+YvRk3yRnTf+Nbp3ry0B4P7QqjTz6J6Z5LF+X/FG1zyZHPonBRRH6K5rAdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'd0bded7d9530dfba2e9cda97afd06ac1'
};

const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: config.channelAccessToken
});

// Route ส่งรูปภาพ
// 🖼️ รูปที่ 1 (line2.png) -> สำหรับคีย์เวิร์ด "ว่าไง"
app.use('/imagemap1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'line2.png'), (err) => {
        if (err) {
            console.error('❌ หาไฟล์ line2.png ไม่เจอ:', err.message);
            res.status(404).send('Image not found');
        }
    });
});

// 🖼️ รูปที่ 2 (line3.png) -> สำหรับคีย์เวิร์ดใหม่ (เช่น "ปัญหาที่พบได้บ่อย")
app.use('/imagemap2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'line3.png'), (err) => {
        if (err) {
            console.error('❌ หาไฟล์ line3.png ไม่เจอ:', err.message);
            res.status(404).send('Image not found');
        }
    });
});

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

    const NGROK_URL = 'https://snagged-strict-diaper.ngrok-free.dev';

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
                    "baseUrl": `${NGROK_URL}/imagemap1?v=1`, // 👈 ชี้ไปที่ /imagemap1
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
    // 🔹 คีย์เวิร์ดที่ 2: เปลี่ยนเป็นคำที่ต้องการ -> ส่งรูปที่ 2 (line3.png)
    // --------------------------------------------------------
    else if (text === 'ปัญหาที่พบได้บ่อย') { // 👈 เปลี่ยนคำว่า 'ปัญหาที่พบได้บ่อย' เป็นคีย์เวิร์ดที่ 2 ของคุณ
        console.log('[LOG] 🚀 เจอคำว่า "ปัญหาที่พบได้บ่อย" -> ส่ง Imagemap รูปที่ 2');
        return client.replyMessage({
            replyToken: event.replyToken,
            messages: [
                {
                    "type": "imagemap",
                    "baseUrl": `${NGROK_URL}/imagemap2?v=1`, // 👈 ชี้ไปที่ /imagemap2
                    "altText": "เมนูที่ 2",
                    "baseSize": { "width": 1040, "height": 1291 },
                    "actions": [
                        // 👈 ปรับตำแหน่งปุ่ม (x, y, width, height) และลิงก์ตามรูปภาพที่ 2
                        { "type": "uri", "area": { "x": 78, "y": 156, "width": 883, "height": 252 }, "linkUri": "https://www.facebook.com/reel/1686468745968609" },
                        { "type": "uri", "area": { "x": 82, "y": 435, "width": 876, "height": 235 }, "linkUri": "https://www.facebook.com/share/v/1CAXmR3obs/" },
                        { "type": "uri", "area": { "x": 78, "y": 701, "width": 885, "height": 235 }, "linkUri": "https://eversun.co.th/content/why-solar-produces-less-than-expected/" },
                        { "type": "message", "area": { "x": 78, "y": 962, "width": 883, "height": 238 }, "text": "กดที่ปรึกษาเจ้าหน้าที่" }
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

app.get('/', (req, res) => res.send('Server is running'));

app.listen(8888, () => console.log('Server started on port 8888'));