import { makeAutoObservable } from "mobx";
import CookieImg from "../assets/cookie.png"
import noobCookieImg from "../assets/noobCookie.png"
import medianCookieImg from "../assets/medianCookie.png"

class CookieStore
{
    data = [
        {
            Scores: 0,
            Image: noobCookieImg,
            Title: "Новичок",
            AddScores: 1,
            RotateSpeed: "8s"
        },
        {
            Scores: 10,
            Image: medianCookieImg,
            Title: "Прошаренный",
            AddScores: 2,
            RotateSpeed: "4s"
        },
        {
            Scores: 50,
            Image: CookieImg,
            Title: "Король",
            AddScores: 4,
            RotateSpeed: "2s"
        }
    ]

    constructor()
    {
        makeAutoObservable(this)
    }
}

const cookieStore = new CookieStore()

export default cookieStore;