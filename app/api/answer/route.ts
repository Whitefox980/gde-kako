import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { question } = await req.json()

  const answers: { [key: string]: string } = {
    "Gde kupiti električni punjač u Beogradu?": "Kupite ga u Tehnomaniji, Emmi ili Gigatronu.",
    "Kako otvoriti firmu u Srbiji?": "Idite u APR i podnesite zahtev.",
    "Gde je najbolja plaža u Crnoj Gori?": "Budvanska rivijera: Mogren, Sveti Stefan i Jaz.",
    "Kako najbrže naučiti strani jezik?": "Koristite Duolingo, Memrise svakodnevno.",
    "Gde servisirati električni trotinet?": "Servisi kao što su Ninebot i eMobilis u Beogradu.",
  }

  const answer = answers[question] || "Trenutno nemamo odgovor na to pitanje."

  return NextResponse.json({ answer })
}
