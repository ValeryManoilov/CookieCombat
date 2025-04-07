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
            Title: "Новичок"
        },
        {
            Scores: 10,
            Image: medianCookieImg,
            Title: "Прошаренный"
        },
        {
            Scores: 50,
            Image: CookieImg,
            Title: "Король"
        }
    ]

    constructor()
    {
        makeAutoObservable(this)
    }
}

const cookieStore = new CookieStore()

export default cookieStore;