import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE,
  isLanguageId,
} from "@/lib/i18n/languages";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const submittedLanguage = formData.get("language");
  const submittedReturnTo = formData.get("returnTo");

  const language =
    typeof submittedLanguage === "string" && isLanguageId(submittedLanguage)
      ? submittedLanguage
      : DEFAULT_LANGUAGE;
  const returnTo =
    typeof submittedReturnTo === "string" &&
    submittedReturnTo.startsWith("/") &&
    !submittedReturnTo.startsWith("//")
      ? submittedReturnTo
      : "/";

  const response = NextResponse.redirect(new URL(returnTo, request.url), 303);
  response.cookies.set(LANGUAGE_COOKIE, language, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  return response;
}
