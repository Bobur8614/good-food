import polz from '../../../assets/images/polzovatel.svg';
import org from '../../../assets/images/org.svg';
import zayavki from '../../../assets/images/Zayavki.svg';
import contacts from '../../../assets/images/contacts.svg';
import tender from '../../../assets/images/tender.svg';
import pk from '../../../assets/images/platejniykalendar.svg';
import products from '../../../assets/images/products.svg';
import post from '../../../assets/images/postavshiki.svg';
import objects from '../../../assets/images/obyektiy.svg';
import smeta from '../../../assets/images/smeta.svg';
import sklad from '../../../assets/images/sklad.svg';
import otch from '../../../assets/images/otchet.svg';
import news from '../../../assets/nodes/new.svg';
import received from '../../../assets/nodes/received.svg';
import confirmed from '../../../assets/nodes/confirmed.svg';
import saved from '../../../assets/nodes/saved.svg';
import confirmSZK from '../../../assets/nodes/podSzk.svg';
import payed from '../../../assets/nodes/payed.svg';
import myContracts from '../../../assets/nodes/mycontracts.svg';
import rejected from '../../../assets/nodes/rejected.svg';
import operating from '../../../assets/nodes/operating.svg';
import byContracts from '../../../assets/nodes/byContracts.svg';
import byRequest from '../../../assets/nodes/byRequest.svg'
import nastroyki from '../../../assets/images/nastroyki.svg';
import access from '../../../assets/nodes/access.svg';
import dostup from '../../../assets/nodes/dostup.svg';
import role from '../../../assets/nodes/role.svg';
import type from '../../../assets/nodes/type.svg';


export const SideData = [
   {
      name: {
         uz: "Foydalanuvchilar",
         en: "Users",
         ru: "Пользователи",
      },
      img: post,
      link: "users",
      active: "/users",
      nodes: []
   },
   {
      name: {
         uz: "Restaranlar",
         en: "Restaurants ",
         ru: "Рестораны"
      },
      img: org,
      link: "org",
      active: "/org",
      nodes: []
   },
   {
      name: {
         uz: "Kategoriyalar",
         en: "Categories",
         ru: "Категории"
      },
      img: pk,
      link: "category",
      active: "/category",
      nodes: []
   },
   {
      name: {
         uz: "Oziq-ovqat",
         en: "Foods",
         ru: "Еда"
      },
      img: post,
      link: "food",
      active: "/food",
      nodes: []
   },
   {
      name: {
         uz: "Menyu",
         en: "Menu",
         ru: "Меню"
      },
      img: smeta,
      link: "menu",
      active: "/menu",
      nodes: []
   }
];
