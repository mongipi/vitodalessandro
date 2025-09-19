import { FiMonitor, FiStopCircle, FiVideo, FiCoffee, FiMusic, FiWatch, FiBox, FiTarget, FiPenTool,FiBook, FiSmartphone, FiActivity, FiSmile, FiAward, FiThumbsUp, FiAirplay, FiAperture, FiCamera, FiCompass, FiSettings, FiPhone, FiMail, FiMapPin} from '../assets/icons/vander'
import { FaLeaf, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

import portfolio1 from '../assets/images/portfolio/1.jpg'
import portfolio2 from '../assets/images/portfolio/2.jpg'
import portfolio3 from '../assets/images/portfolio/3.jpg'
import portfolio4 from '../assets/images/portfolio/4.jpg'
import portfolio5 from '../assets/images/portfolio/5.jpg'
import portfolio6 from '../assets/images/portfolio/6.jpg'

import client1 from '../assets/images/client/01.jpg'
import client2 from '../assets/images/client/02.jpg'
import client3 from '../assets/images/client/03.jpg'
import client4 from '../assets/images/client/04.jpg'
import client5 from '../assets/images/client/05.jpg'
import client6 from '../assets/images/client/06.jpg'

import blog1 from '../assets/images/blog/01.jpg'
import blog2 from '../assets/images/blog/02.jpg'
import blog3 from '../assets/images/blog/03.jpg'
import blog4 from '../assets/images/blog/04.jpg'
import blog5 from '../assets/images/blog/05.jpg'
import blog6 from '../assets/images/blog/06.jpg'
import blog7 from '../assets/images/blog/07.jpg'
import blog8 from '../assets/images/blog/08.jpg'

export const hobbiesData = [
    {
        icon:FiMonitor,
        title:'Developing'
    },
    {
        icon:FiStopCircle,
        title:'Mac OS'
    },
    {
        icon:FiVideo,
        title:'Cinema'
    },
    {
        icon:FiCoffee,
        title:'Coffee'
    },
    {
        icon:FiMusic,
        title:'Music'
    },
    {
        icon:FiWatch,
        title:'Games'
    },
    {
        icon:FiBox,
        title:'Designing'
    },
    {
        icon:FiTarget,
        title:'Sports'
    },
    {
        icon:FiPenTool,
        title:'Painting'
    },
    {
        icon:FiBook ,
        title:'Reading'
    },
    {
        icon:FiSmartphone,
        title:'Android'
    },
    {
        icon:FiActivity,
        title:'Other Activity'
    },
]

export const counterData = [
    {
        icon: FiSmile,
        target: '1251',
        title: 'Happy Client'
    },
    {
        icon: FiAward,
        target: '15',
        title: 'Award Won'
    },
    {
        icon: FiCoffee,
        target: '3261',
        title: 'Cup of Coffee'
    },
    {
        icon: FiThumbsUp,
        target: '36',
        title: 'Project Complete'
    },
]

export const offerData = [
  {
    icon: FaLeaf,
    title: "Tutela dell’ambiente",
    desc: "Iniziative concrete per la protezione del territorio, la promozione di energie rinnovabili e la sostenibilità.",
  },
  {
    icon: FaUsers,
    title: "Ascolto del cittadino",
    desc: "Organizzazione di incontri pubblici, forum di quartiere e confronto diretto per decisioni condivise.",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Educazione ambientale",
    desc: "Progetti nelle scuole e campagne informative per diffondere la cultura della responsabilità ecologica.",
  },
];

export const workTabData = [
    {
        title:'HTML',
        value: '84%'
    },
    {
        title:'CSS',
        value: '75%'
    },
    {
        title:'JQuery',
        value: '79%'
    },
    {
        title:'English',
        value: '84%'
    },
    {
        title:'Spanish',
        value: '75%'
    },
    {
        title:'German',
        value: '79%'
    },
    {
        title:'Photoshop',
        value: '84%'
    },
    {
        title:'Sketch',
        value: '75%'
    },
]

export const portfolioData = [
    {
        image: portfolio1,
        title: 'Working Keyboard',
        name: 'Branding',
        category:'branding'
    },
    {
        image: portfolio2,
        title: 'The Micro Headphones',
        name: 'Development',
        category:'development'
    },
    {
        image: portfolio3,
        title: 'The Coffee Cup',
        name: 'Designing',
        category:'designing'
    },
    {
        image: portfolio4,
        title: 'The Wooden Desk',
        name: 'Photography',
        category:'photography'
    },
    {
        image: portfolio5,
        title: 'Camera',
        name: 'Illustrations',
        category:'development'
    },
    {
        image: portfolio6,
        title: 'Branded Laptop',
        name: 'Photoshop',
        category:'photography'
    },
]
export const portfolioImage = [ portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6]

export const clientData = [
    {
        image: client1,
        name: 'Erich Bissonette',
        brand: 'Oppo',
        title: '" Design Quality "',
        desc: 'There are many variations of passages of Lorem Ipsum available, by injected humour, or randomised words which dont look even slightly believable.'
    },
    {
        image: client2,
        name: 'Tina Meyer',
        brand: 'Vivo',
        title: '" Code Quality "',
        desc: 'There are many variations of passages of Lorem Ipsum available, by injected humour, or randomised words which dont look even slightly believable.'
    },
    {
        image: client3,
        name: 'Sharon Murdock',
        brand: 'Apple',
        title: '" Feature Availability "',
        desc: 'There are many variations of passages of Lorem Ipsum available, by injected humour, or randomised words which dont look even slightly believable.'
    },
    {
        image: client4,
        name: 'Jesse Hunt',
        brand: 'Samsung',
        title: '" Customizability "',
        desc: 'There are many variations of passages of Lorem Ipsum available, by injected humour, or randomised words which dont look even slightly believable.'
    },
    {
        image: client5,
        name: 'Andrea Toy',
        brand: 'Nokia',
        title: '" Flexibility "',
        desc: 'There are many variations of passages of Lorem Ipsum available, by injected humour, or randomised words which dont look even slightly believable.'
    },
    {
        image: client6,
        name: 'Jay Allums',
        brand: 'RedMI',
        title: '" Development "',
        desc: 'There are many variations of passages of Lorem Ipsum available, by injected humour, or randomised words which dont look even slightly believable.'
    },
]

export const blogData = [
    {
        id:1,
        image: blog1,
        title: 'Our Home Entertainment has Evolved Significantly',
        name: 'Cristino',
        tag: 'Branding',
        date: '13th Sep 2023'        
    },
    {
        id:2,
        image: blog2,
        title: 'These Are The Voyages of The Starship Enterprise',
        name: 'Tina Meyer',
        tag: 'Development',
        date: '29th Nov 2023'        
    },
    {
        id:3,
        image: blog3,
        title: 'Three Reasons Visibility Matters in Supply Chain',
        name: 'Jay Allums',
        tag: 'designing',
        date: '29th Dec 2023'        
    },
    {
        id:4,
        image: blog4,
        title: 'Our Home Entertainment has Evolved Significantly',
        name: 'Andrea Toy',
        tag: 'photography',
        date: '13th March 2023'        
    },
    {
        id:5,
        image: blog5,
        title: 'These Are The Voyages of The Starship Enterprise',
        name: 'Cristino',
        tag: 'Branding',
        date: '5th May 2023'        
    },
    {
        id:6,
        image: blog6,
        title: 'Three Reasons Visibility Matters in Supply Chain',
        name: 'Sharon Murdock',
        tag: 'photography',
        date: '19th June 2023'        
    },
    {
        id:7,
        image: blog7,
        title: 'Our Home Entertainment has Evolved Significantly',
        name: 'Erich Bissonette',
        tag: 'Branding',
        date: '20th June 2023'        
    },
    {
        id:8,
        image: blog8,
        title: 'These Are The Voyages of The Starship Enterprise',
        name: 'Cristino',
        tag: 'Development',
        date: '31st Aug 2023'        
    },
]

export const contactData = [
    {
        icon: FiPhone,
        title: 'Telefono',
        // desc: 'Promising development turmoil inclusive education transformative community',
        link:'+39 340 454 12 33',
        linkData: 'tel:+152534-468-854'
    },
    {
        icon: FiMail,
        title: 'Email',
        // desc: 'Promising development turmoil inclusive education transformative community',
        link:'vitodalessandro@gmail.com',
        linkData: 'mailto:vitodalessandro@gmail.com'
    },
    // {
    //     icon: FiMapPin,
    //     title: 'Location',
    //     desc: 'C/54 Northwest Freeway, Suite 558, Houston, USA 485',
    //     link:'View on Google map',
    //     linkData: 'tel:+152534-468-854'
    // },
]

export const recentPost = [
    {
        image: blog7,
        title: 'Consultant Business',
        date: '13th March 2023'
    },
    {
        image: blog8,
        title: 'Consultant Business',
        date: '5th May 2023'
    },
    {
        image: blog1,
        title: 'Consultant Business',
        date: '19th June 2023'
    },
]

export const blogComment = [
    {
        image: client1,
        name: 'Lorenzo Peterson',
        date: '13th March 1:00 pm',
        desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal'
    },
    {
        image: client2,
        name: 'Tammy Camacho',
        date: '5th May 10:00 am',
        desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour'
    },
    {
        image: client3,
        name: 'Eleanor Crisp',
        date: '19th June 9:00 am',
        desc: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.'
    },
    {
        image: client4,
        name: 'Richard Combs',
        date: '20th June 2:00 pm',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.'
    },
]