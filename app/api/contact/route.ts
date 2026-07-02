import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, type, message } = body;

    // 簡易バリデーション
    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: "すべての必須項目を入力してください。" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "無効なメールアドレス形式です。" },
        { status: 400 }
      );
    }

    // ネットワーク遅延のシミュレーション (1.5秒)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 実際の実務ではここでデータベース保存やメール送信サービス（Resend/SendGridなど）を呼び出します
    console.log("Contact form submitted:", { name, email, type, message });

    return NextResponse.json(
      { success: true, message: "お問い合わせが正常に送信されました！" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "サーバー処理中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
