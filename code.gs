// ตัวอย่างการส่ง Looker ไฟล์เข้า Email : https://lh3.googleusercontent.com/d/1hLaDc4VWpHKL62wYAMiOHb0PkTnP6n90

var emailKeyword = "Screenshot"; // ชื่อของ Looker Studio

function sendLookerReportToTelegram() {
    const TELEGRAM_BOT_TOKEN = "XXXXXXXX";
    const TELEGRAM_CHAT_ID = "XXXXXXXX";

    // Fetch the latest email matching the specified keyword
    const threads = GmailApp.search(`from:"looker-studio-noreply@google.com" subject:${emailKeyword}`, 0, 1);
    if (!threads.length) return;

    const latestMessage = threads[0].getMessages().pop();
    const attachments = latestMessage.getAttachments();
    if (!attachments.length) return;

    const formattedDate = Utilities.formatDate(latestMessage.getDate(), 'GMT+7', 'MM-dd-yyyy');
    const caption = `Looker Report on ${formattedDate}`;
    const imageBlob = attachments[0].copyBlob();

    // Send the attachment to Telegram
    const options = {
      method: "post",
      payload: {
        'chat_id': TELEGRAM_CHAT_ID,
        'caption': caption,
        'photo': imageBlob
      }
    };

    UrlFetchApp.fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, options);
}
