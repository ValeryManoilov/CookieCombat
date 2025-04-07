import { makeAutoObservable } from "mobx";
import CookieImg from "../assets/cookie.png"

class CookieStore
{
    data = [
        {
            "Scores": 0,
            "Image": CookieImg,
            "Title": "Новичок"
        },
        {
            "Scores": 100,
            "Image": CookieImg,
            "Title": "Прошаренный"
        },
        {
            "Scores": 500,
            "Image": CookieImg,
            "Title": "Король"
        }
    ]

    constructor()
    {
        makeAutoObservable(this)
    }
}

const cookieStore = new CookieStore()

export default cookieStore;