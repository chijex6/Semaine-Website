import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { ChevronRight, MapPin, Truck, Package, CheckCircle, CreditCard, Check, Landmark, Hash, ShoppingCart, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { Breadcrumb } from "../components/Breadcrumb";
import { Toast, ToastType } from "../components/Toast";
import { CountdownTimer } from "../components/CountdownTimer";
import { form } from "framer-motion/client";
const DELIVERY_FEES = {
  pickup: 0,
  lagos: {
    island: 2000,
    mainland: 1500
  },
  others: 3500
};

const mappedData = {
  Abia: {
      Aba: {
        GIG: "No 5 Asa Road Former/Old Nitel Building Aba",
      },
      "Aba 2": {
        GIG: "G.R.A 30 Brass Street after Jevinic Restaurant Aba",
      },
      Umuahia: {
        GIG: "8 Mission Hill, Opposite Villaroy Hotel, Umuahia Main Town",
        GUO: "50 mission hill opposite Gado hotels and beside governor Dr Okezie Ikpeazu  campaign office Umuahia",
      },
      "Umuahia 2": {
        GIG: "No 60 Aba Road, Close to MTN Office at Aba Road, Umuahia",
      },
    },
    Abuja: {
      "Area 1": {
        GIG: "SH 034, Area 1 shopping Plaza, Area 1 Abuja",
      },
      Garki: {
        GIG: "SICCONS PLAZA, Opposite Unity House, Beside Lifemate Furniture, Garki Area 11",
      },
      Gwarimpa: {
        GIG: "House 38, 3rd Avenue Gwarimpa, Opposite Union Bank Abuja.",
      },
      "Gwarimpa 2": {
        GIG: "Suite A1 Bricks and More Plaza, 6th Avenue by 7th Avenue Junction Gwarinpa",
      },
      Gwagwalada: {
        GIG: "Secretariat road beside WAEC, opposite Aso-Oke Hotel, Gwagwalada.",
      },
      Kubwa: {
        GIG: "Opposite 2/2 court junction, block 43, Gado Nasko way, along El-rufai Bustop, Kubwa.a",
        GUO: "GLora Mall Plaza, Plot No 132 Gado Nasko Road Phase 2 Kubwa, Abuja",
      },
      "Kubwa 2": {
        GIG: "Opposite Ignobis hotel plot 17 Gidin dutse layout, kubwa.",
      },
      "Kubwa 3": {
        GIG: "Kukwaba General Park, Kubwa.",
      },
      Lugbe: {
          GIG: "Shepherd-King plaza beside Remaco fuel station by Police signboard, Lugbe.",
      },
      MARARABA: {
        GIG: "No 132 Giza Plaza Opp Chrisgold Plaza Beside MTN Office Mararaba.",
        GUO: "SUITE 9, BOMMA PLAZA, SHARP CORNER BY CRISS PARK JUNCTION, ABUJA-KEFFI EXP. WAY.",
      },
      Madalla: {
        GIG: "Mobil Fueling Station along Zuba Express Way, Madalla.",
      },
      Utako: {
        GIG: "Plot 113 I.V.W. Osisiogu Street, beside Utako Police Station Utako Abuja.",
        GUO: "GOUBA Plaza, 15 A. E. Ekukinam Street, Utako District, Abuja.",
      },
      "Utako 2": {
          GIG: "Abraham Plaza, Suite A13 Plot, 6 A.E. Ekukinam St, Utako Abuja.",
      },
      "Wuse 2": {
        GIG: "80 Aminu Kano crescents opposite Sherif plaza beside Wema Bank Banex wuse 2",
      },
      "Ademola Adetokunbo": {
        GIG: "12 Nurnberger Platz, by Lobito junction, Ademola Adetokunbo Crescent, before Transcorp Hilton, Wuse 2",
      },
      Zuba: {
        GIG: "206, Zuba Market, Opp. Lagos Line, Zuba",
      },
    },
  Adamawa: {
    Yola: {
      GIG: "Plot 2 Bekaji Plaza, Bekaji Karewa Road, By Fire Service Roundabout, Jimeta Yola.",
    },
  },
  "Akwa Ibom": {
    Eket: {
      GIG: "92, Marina Road, Opposite Royalty Hotel, Eket.",
    },
    Uyo: {
      GIG: "3, Monsignor Akpan Avenue, Itam industrial layout, opp Timber Market, Itam",
    },
    "Uyo 2": {
      GIG: "No 108 Oron Road, beside First bank,Uyo",
    },
  },
  Anambra: {
    AWKA: {
      GIG: "Elite Shopping Complex Opp Crunchies fries, Enugu/Onitsha Expressway, Awka",
      GUO: "Temp Site Unizik Junction, beside Mobile Filling Station, Awka",
    },
    EKWULOBIA: {
      GUO: "7, Awka Road, Ekwulobia",
    },
    IHIALA: {
      GUO: "42, Osha Owerri Road by Patigian Hotels Ltd, Ihiala",
    },
    NNEWI: {
      GIG: "73 Owerri Road, Martina Chukwuma Plaza (Innoson Plaza), Opposite The Salvation Army Church, Umudim Nnewi",
      GUO: "2, Ibeto Road, Opp.First Bank, Nnewi",
    },
    ONITSHA: {
      GIG: "2 Awka Road, By DMGS Junction, Beside All Saints Anglican Cathedral, Onitsha",
      GUO: "166, Port Harcourt Rd, Upper Iweka, Onitsha",
    },
    UMUNZE: {
      GUO: "Round About, Umunze",
    },
  },
  Bauchi: {
    Bauchi: {
      GIG: "Shop 7, Mai Jama'a Plaza, Opposite GWARAM and Sons Plaza, Yandoka Road, Bauchi.",
    },
  },
  Bayelsa: {
      Yenagoa: {
          GIG: "Kpansia Epia, Opposite Wema Bank by INEC Junction, Yenogoa",
          },
          "Yenagoa 2": {
          GIG: "Beside Phone Headquarters, Tamic Road Junction, Okutukutu, by Express, Yenegoa.",
          },
  },
  Benue: {
      Makurdi: {
          GIG: "No 4 Old Otukpo Rd, Opposite Dester’s by Savannah Roundabout.",
          },
  },
  Borno: {
      Maiduguri: {
          GIG: "10A, Golden plaza, opposite Elkanemi College of Islamic Theology, Jos Road, Maiduguri",
          },
  },
  CrossRiver: {
      Calabar: {
          GIG: "29, Ndidem Usang Iso Road ( Aka Marian Road) Calabar.",
          },
          "Calabar 2": {
          GIG: "74, Eta Agbor road, Beside UNICAL, opposite MTN office, Calabar.",
          },
          OGOJA: {
          GUO: "Mh 113 Hospital Road, opp. Blessed Resources international oil, Beside EcoBank plc, Igoli, Ogoja",
          },
  },
  Delta: {
      Asaba: {
          GIG: "Asaba Onitsha Express way, By Head Bridge.",
          GUO: "Asaba - Onitsha Expressway by Head-Bridge, Asaba, Delta State",
          },
          "Asaba 2": {
          GIG: "445, Nnebisi Road, opposite Zenith Bank, Asaba.",
          },
          "Asaba 3": {
          GIG: "Suit 53/54 Independence Mall Okpanam Rd, Asaba.",
          },
          "Ughelli Center": {
          GIG: "6B, Uduere/Agbara Road, Off Ughelli-Warri Express Way, Ughelli.",
          },
          "Warri 2": {
          GIG: "116, Effurun-Sapele Warri Road, Effurun Opp. Our Ladies High School.",
          },
          "Warri-Effurun Center": {
          GIG: "Shop 5, Eku Plaza, 128 Effurun-Sapele road, Opp Solidas. Adjacent PZ Cussons by 7up Bus stop.",
          },
  },
  Ebonyi: {
      Abakaliki: {
          GIG: "Central Park, opposite International Market, Abakaliki",
          GUO: "GUO Office complex, at New Park, Opposite International Market, Behind Peace Park",
          },
          AFIKPO: {
          GUO: "27, Eke Market Road, Opp. Zenith Bank, Afikpo, Ebonyi State",
          },
  },

  Edo: {
      Akpakpava: {
          GIG: "112, Akpakpava Road, Benin City.",
          },
          "Airport Road": {
          GIG: "Shop 1, Omegatron Plaza, 47 Airport Road, Benin City.",
          },
          Auchi: {
          GIG: "Okene Express Way, Opp Auchi Polytechnic, Auchi.",
          },
          Benin: {
          GUO: "211 Ugbowo-Lagos Rd, by Technical Junction, Benin City, Edo state.",
          },
          "Sapele Road": {
          GIG: "131 Benin Sapele Road, Beside Genesis Restaurant, opposite Uwa Junction, Benin City.",
          },
          Ekpoma: {
          GIG: "Along Benin -Auchi expressway, Beside Big Joe park, Ekpoma.",
          },
          Uselu: {
          GIG: "202, Uselu Lagos Road, Ugbowo Benin City.",
          },
          "Ramat Park": {
          GIG: "42, Benin-Agbor road, EcoBus Park, Ramat Benin City.",
          },
  },
  Ekiti: {
      "Ado-Ekiti": {
          GIG: "Soladola petrol station, beside Apc secretariat, opposite moferere junction, along ikere road, Ajilosun",
          },
  },
  Enugu: {
      Enugu: {
          GIG: "No 1, P & T Quarters, Market Road, Opp Osisatech Polytechnic, Enugu.",
          GUO: "34 Okpara Avenue (in between UBA & Polaris Bank), Enugu",
          },
          "Enugu 2": {
          GIG: "67, Zik Avenue Uwani Enugu.",
          },
          Nsukka: {
          GIG: "No 64 Owerrani, Enugu Road, Nsukka.d",
          },
  },
  Gombe: {
      Gombe: {
          GIG: "Shop 4, el-zaks plaza opposite Conoil filling station along FTH/police Headquarters ashaka road, Gombe.",
          },
  },
  Imo: {
      Owerri: {
          GIG: "Plot C31, Relief Road, by Relief Junction, Off Egbu Road, Owerri.",
          GUO: "15, Egbu Road, Owerri",
          },
          "Owerri 2": {
          GIG: "Odonko Plaza, No 7 Nwaturuocha street, Ikenegbu Owerri.",
          },
          "Owerri 3": {

          GIG: "Shop 9 Lion Yard Plaza, plot 26A/26B Federal Housing Estate along Umuguma Road (World Bank), New Owerri.",
          },
          ORLU: {
          GUO: "No 7 ASIKA ILOBI Avenue, Orlu, Imo",
          },

  },
  Jigawa: {
      Dutse: {
          GIG: "Government House Round-About, Asamau House Block B, Number 8, by Airtel Office, Dutse, Jigawa State.",
          },
  },
  Kaduna: {
      KADUNA: {
          GIG: "Jos Road Plaza. 19/20, Jos Road, by Ahmadu Bello Way, Kaduna.",
          },
          "KADUNA 2": {
          GIG: "Shop A04, No 6 Gidanbu Plaza, Kaduna to Lagos Road, Opposite Kaduna Old Airport Road, Kaduna.",
          },
          "KADUNA 3": {
          GIG: "Nnamdi Azikiwe Expressway by Command Junction, close to Samrada Fuel Station (beside 911 bakery).",
          },
          Zaria: {
          GIG: "Shop 2, D2 Plaza No. 18 Sokoto road beside Shagalinku London Hotel after MTD Junction, Sabon Gari Zaria.",
          },
  },
  Kano: {
      KANO: {
          GIG: "1, Bompai Road by Tafawa Balewa Way, Opp Domino's Pizza, Kano.",
          },
          "KANO 2": {
          GIG: "Shop 2&3 Centro Plaza, Opp BUK Old Site, Kabuga, Kano.",
          },
          "KANO 3": {
          GIG: "Khadijah house, Zaria Road opposite Kano State House of Assembly",
          },
  },
  Katsina: {
      Katsina: {
          GIG: "Abudullahi Sarki Muktar Road, Along Kiddies Round-About, Near Tukur Jikamshi Residence Katsina.",
          },
  },
  Kebbi: {
      "Birnin Kebbi": {

          GIG: "Ahmadu Bello Way opp alhaji boye coca cola Depot birnin kebbi, kebbi state",
          },
  },
  Kogi: {
      Lokoja: {
          GIG: "No 1 IBB Way, Adankolo, Lokoja, close to Federal Medical Center.",
          },
  },
  Kwara: {
      Ilorin: {
          GIG: "151, Ibrahim Taiwo Road (Upper Taiwo), Adjacent Chicken Republic, Ilorin",
          },
          "Ilorin 2": {
          GIG: "34B, University of Ilorin Road, Beside Reo Cakes Plaza, Tanke, Ilorin.",
          },
  },
  Lagos: {
      "Abule-Egba": {
        GIG: "568, Abeokuta Expressway, Ajala Bus/Stop Abule-Egba.",
      },
      Agbara: {
        GIG: "Agbeke Filling Station, Morogbo, Along Badagry Expressway Agbara, Lagos.",
      },
      AGEGE: {
        GUO: "3, Agunbiade Oke-koto Street, Agege, Lagos.",
      },
      "Alaba International": {
        GIG: "Cs1 Ground Floor Corner Stone Plaza By Dobbil Avenue Along Phone Village Road, Electronics Section Alaba International Market.",
        GUO: "Alaba International Mkt, 29, Ojo Ebegbede Road, Opp. Chemist Bus-Stop, Alaba, Lagos",
      },
      "Ajah 1": {
        GIG: "KM 25, Lekki-Epe Express way, Ajiwe-Ajah.",
      },
      "Ajah 2": {
        GIG: "KM 22, Lekki-Epe Express way, Opp. Jeffrey’s Plaza, by Abraham Adesanya Roundabout, Ajah.",
        GUO: "KM 22, Epe - Expressway, Abraham Adesanya Est. Junction, Ajah, Lagos",
      },
      "Addo Badore": {
        GIG: "Tripple Ace Dew Building, opposite Enyo filling Station Addo road.",
      },
      Akowonjo: {
        GIG: "41 Shasha Road, Akowonjo Junction, Dopemu, Lagos.",
      },
      Awoyaya: {
        GIG: "Titi's Place, beside Royal Park Hotel, by Ogunfayo Bus stop. Km 36, Lekki Epe expressway, Eputu, Awoyaya, Lagos.",
      },
      "Amuwo-Odofin": {
        GIG: "Shop A105 Cosjane Mall Opposite Diamond Estate, By Festac Link Bridge, Amuwo Odofin, Lagos.",
      },
      "Broad Street": {
        GIG: "158 Broad street, Lagos Island. (Behind UBA head office Marina), Lagos.",
      },
      "Cele Okota": {
        GIG: "103, Okota Road, Cele.",
      },
      COKER: {
        GUO: "36 Alhaji Orire Street, Wema Bank Bus Stop, Coker, Lagos",
      },
      Epe: {
        GIG: "Animashaun Plaza, Beside Petrocam fuel station, Near Epe T-junction, Epe.",
      },
      EJIGBO: {
        GUO: "67A, Ikotun-Egbe Road, Opp Power Line B/Stop, Ejigbo.",
      },
      Festac: {
        GIG: "1st Avenue Road,Festac first gate, beside Inec office, Festac town, Lagos.",
      },
      Gbagada: {
        GIG: "7, Hospital Rd, Ifako, Gbagada, Lagos.",
      },
      "Gbagada Express Center": {
        GIG: "GIG Logistics Digital Hub. No 1 Sunday Ogunyade Street, Gbagada Expressway,Beside Eterna Fuel Station, Gbagada Lagos.",
      },
      Iba: {
        GUO: "1, Ipaye Street, Iba, Lagos",
      },
      "Ikeja 2": {
        GIG: "80, Awolowo Way, Ikeja, Lagos.",
      },
      "Ikeja 1": {
        GIG: "9, Medical Road, former Simbiat Abiola Way, Opp, Zenith Bank.",
      },
      Isolo: {
        GIG: "43, Osolo Way, Ajao Estate, Ekwu Awolo House.",
      },
      Ikoyi: {
        GIG: "103 Awolowo road, Ikoyi Lagos.",
      },
      Ikosi: {
        GIG: "16 Ikosi Road, Ketu Lagos.",
      },
      Ikorodu: {
        GIG: "Sabo Road Garage, Ikorodu.",
      },
      Fadeyi: {
        GIG: "69, Ikorodu Road, Fadeyi, Lagos",
      },
      Ikotun: {
        GIG: "29,Idimu Road, Opp. Local Govt, Council, Ikotun, Lagos.",
        GUO: "10 Ijegun road, Ikotun",
      },
      Ilupeju: {
        GIG: "Flat 1, Block 1, LSDPC Estate Beside UBA, 12, Industrial Avenue, Cappa Bus-stop, Ilupeju, Lagos.",
      },
      "International trade fair": {
        GIG: "Shop D77 & D78, Abia Plaza, BBA, Lagos Int’ Trade Fair Complex, Lagos.",
      },
      "Igbo Efon": {
        GIG: "Km 17 Scapular plaza Igbo efon.",
      },
      "Iyana Ipaja": {
        GIG: "164, Lagos Abeokuta Express Way, beside Access Bank, Iyana Ipaja, Lagos.",
        GUO: "KM 168 Abeokuta Expressway/No 1 Tijani Street beside Access bank, Iyana Ipaja Bus Stop, Iyana Ipaja, Lagos State.",
      },
      Jibowu: {
        GIG: "GIGM Terminal: 20 Ikorodu Express Road, Jibowu, Lagos.",
        GUO: "2 Jibowu Street along Ikorodu Expressway, Jibowu, Lagos.",
      },
      "Lekki Admiralty": {
        GIG: "No 1A, Wole Ariyo Street, Beside First Bank, Lekki Phase 1.",
      },
      "Lekki Admiralty 2": {
        GIG: "Jubilee Mall Admiralty Way, Lekki Phase One, Lekki.",
      },
      "Lekki Admiralty 3": {
        GIG: "Lekki Center, No 2, Admiralty Road, Lekki Phase 1.",
      },
      "Lekki (Fola Osibo)": {
        GIG: "Ground floor Legends Place Mall Plot 29 Fola Osibo Lekki Phase 1, Lagos.",
      },
      "MAZA MAZA": {
        GUO: "1st Gate B/Stop Badagry Express Way Maza Maza Lagos",
      },
      Oniru: {
        GIG: "Banex Mall Suite V.GL 01, Akiogun Road, Oniru, Lagos.",
      },
      "Old Ojo Road": {
        GIG: "Old Ojo Road, After Agboju Bus stop, opposite Access Bank, by the police Station.",
      },
      Ogba: {
        GIG: "3 Ijaiye Road, Beside FCMB Ogba.",
      },
      Ogudu: {
        GIG: "141, Ogudu road Beside UBA, Studio24 building, Ogudu.",
      },
      "Ojodu Berger": {
        GIG: "47A Ogunnusi Road, opp Divas cake, beside Access Bank, Ojodu Berger b/stop, Lagos.",
      },
      OKOTA: {
        GUO: "164, Okota Road, Lagos",
      },
      Opebi: {
        GIG: "62B, Opebi Road by Salvation junction Opp So-fresh, Opebi, Ikeja, Lagos",
      },
      "Orchid Road": {
        GIG: "Orchid road (E-MALL Plaza) by VAN DANIEL's Estate Orchid Lagos.",
      },
      "Osapa (Canal Mall)": {
        GIG: "2 Ganiu Eletu Way, Osapa London, Lekki-Epe Expressway, Lagos.",
      },
      OTTO: {
        GUO: "7 Railway compound Otto Bus stop, Opp. Police barracks, Otto, Lagos",
      },
      Oyingbo: {
        GIG: "No 25 Otto Causeway Opp Iddo Bus stop, Iddo Ebute Metta Lagos.",
      },
      Sango: {
        GIG: "3, Abeokuta – Lagos Expressway, Sango Ota, Opp. Sango Bridge.",
      },
      Surulere: {
        GIG: "26, Adeniran Ogunsanya, Surulere, Lagos.",
      },
      Volks: {
        GIG: "169, Badagry Expressway, Volkswagen Bus Stop.",
      },
      "Victoria Island": {
        GIG: "1436 Sanusi Fafunwa Street, Victoria Island, Lagos.",
      },
      "Victoria Island 2": {
        GIG: "272b Akin Adeshola Street, Beside Honda Place, Victoria Island, Lagos.",
      },
      Yaba: {
        GIG: "Shop G-021, Ground Floor, Tejuosho Ultra Modern Shopping complex, Ojuelegba road, Yaba.",
      },
    },
  Nasarawa: {
      Lafia: {
          GIG: "Shops 1 & 2 Police Officers Mess, Opposite Polaris Bank, Jos Road, Lafia.",
          },
  },
  Niger: {
      Minna: {
          GIG: "Landmark: After Mr Biggs beside Nepa Office, Farm Center Area, Tunga, Minna – Niger State.",
          },
  },
  Ogun: {
      Abeokuta: {
          GIG: "62, Tinubu Street, Ita Eko, Abeokuta, Ogun State",
          },
          "Abeokuta FUNAAB": {
          GIG: "Block A, Shop 9, SSANU complex, besides Paradise, FUNAAB, Abeokuta",
          },
          "Ijebu Ode": {
          GIG: "3, Abeokuta-Lagos Expressway, beside 9mobile office Opp. Sango Bridge, Sango Ota.",
          },
          "Sango Ota": {
          GIG: "102, Ibadan road opposite NEPA office Ibadan garage ijebu ode.",
          },
  },
  Ondo: {
      Akure: {
          GIG: "22, Oyemekun Road, Opposite SLOT, Akure, Ondo State.",
          },
          Ondo: {
          GIG: "30, Yaba Street, Opposite Crunchies, Ondo Town, Ondo State.",
          },
  },
  Osun: {
      "Ile-Ife": {
          GIG: "EXODUS Filling Station, opposite Airtel Office, Mayfair, Ile-lfe, Osun State",
          },
          Osogbo: {
          GIG: "KM3, Gbongan/Ibadan Road, NIPCO Petrol Station, Ogo Oluwa, Osogbo.",
          },
  },
  Oyo: {
      Ibadan: {
          GIG: "Town Planning Complex, by Sumal Foods, Ring Road, Ibadan",
          },
          "Ibadan 2": {
          GIG: "Suite 5, Kamal memorial plaze, former iyalode complex, opposite funcktionals clothing, bodija - UI road, UI Ibadan.",
          },
          "Ibadan 3": {
          GIG: "Bovas Filling Station, 106/107 Agbaakin Layout adjacent olowo tin fowo shanu shopping complex, Iwo Road, Ibadan.",
          },
          Ogbomoso: {
          GIG: "Eterna Fuel Station (Akala Complex), Opp Zenith Bank Starlight Ogbomoso",
          },
  },
  Plateau: {
      Jos: {
          GIG: "Plaza 1080, Yakubu Gowon way, Dadin kowa second gate.",
          },
          "Jos 2": {
          GIG: "Opposite Jankwano Bingham University Teaching Hospital, Jos.",
          },
  },
  Rivers: {
      "PORT HARCOURT Alakahia": {
          GIG: "Linus Book Shop Building beside Today FM Road, East-West Road PHC.",
          },
          "PORT HARCOURT Elelenwo": {
          GIG: "No 299 Old Refinery Road, by De-Young Junction, Elelenwo, Port Harcourt.",
          },
          "PORT HARCOURT Eliozu": {
          GIG: "emmanuel plaza, G.u Ake Road, beside planet filling station, eliogbolo, Eliozu, Port Harcourt.",
          },
          "PORT HARCOURT Woji": {
          GIG: "Agora Plaza. 118 Woji Road, By Bodo Junction, GRA Phase 2, Port Harcourt. (Same Building with Miskay Boutique).",
          },
          "PORT HARCOURT Stadium": {
          GIG: "9 Stadium Road, Beside Benjack, Port Harcourt",
          },
          "PORT HARCOURT Artillery": {
          GIG: "Cocaine Village Junction, Off Aba Rd, opposite Genesis, Rumuogba, Port Harcourt.",
          },
          "PORT HARCOURT Peter Odili": {
          GIG: "89, Peter Odili Road, Besides Eterna Fueling Station, Port Harcourt",
          },
          "PORT HARCOURT Ada George": {
          GIG: "No 18 Ada George By Okilton Junction, Port Harcourt.",
          },
          "PORT HARCOURT Tombia": {
          GIG: "67, Tombia Ext GRA, Port Harcourt.",
          },
          "PORT HARCOURT Olu Obasanjo": {
          GIG: "61, Olu Obasanjo Road, opposite olu obasanjo roundabout, Port Harcourt.",
          },
          "PORT HARCOURT Air Force Base": {
          GUO: "Along Aba road (at intersection with Lord Emmanuel Drive, b/w Thermocool & Happy Bite), Opp Air Force Base, Port Harcourt",
          },
  },
  Sokoto: {
      Sokoto: {
          GIG: "3/4 Maiduguri Road Gawon Nama Area",
          },
  },
  Taraba: {
      Jalingo: {
          GIG: "106 White Castle Plaza Barde Way Beside A.U.K Kirbir Shopping Plaza, Jalingo.",
          GUO: "Opp. Coca Cola Depot, Along Mile 6, Yola Road.",
          },
  },
  Yobe: {
      Damaturu: {
          GIG: "Shop 2, Adhaza Plaza, Gashuwa Road, Damaturu.",
          },
  },
};
const STATES = ["Abuja", "Ogun", "Oyo", "Rivers", "Kano", "Enugu", "Delta"];
const POPULAR_STOPS = {
  Abuja: ["Wuse", "Garki", "Maitama", "Gwarinpa"],
  Ogun: ["Abeokuta", "Ijebu Ode", "Sagamu", "Ota"],
  Oyo: ["Ibadan", "Ogbomoso", "Oyo", "Iseyin"]
};
const LAGOS_AREAS = {
  island: ["Lekki", "Victoria Island", "Ikoyi", "Ajah"],
  mainland: ["Ikeja", "Yaba", "Surulere", "Maryland"]
};
const BANK_DETAILS = {
  accountName: "Semaine Security Ltd",
  bankName: "First Bank",
  accountNumber: "0123456789"
};
const USSD_CODE = "*737*8*9#";
export const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems
  } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false
  });
  const [hasTransferred, setHasTransferred] = useState(false);
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);
  useEffect(() => {
    const savedAddress = localStorage.getItem("savedAddress");
    if (savedAddress) {
      setFormData(prev => ({
        ...prev,
        ...JSON.parse(savedAddress)
      }));
    }
  }, []);
  const [formData, setFormData] = useState({
    orderid: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    locationType: "",
    state: "",
    lagosZone: "",
    city: "",         // New field
    pickupPoint: "",  // New field
    address: "",
    deliveryMethod: ""
  });
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = formData.deliveryMethod === "pickup" ? 0 : formData.locationType === "lagos" ? DELIVERY_FEES.lagos[formData.lagosZone] : DELIVERY_FEES.others;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-fill address when pickup point is selected
      if (name === 'pickupPoint' && newData.state && newData.city) {
        newData.address = (mappedData[newData.state as keyof typeof mappedData] as any)[newData.city][value];
      }
      
      return newData;
    });
  };
  

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" required />
              </div>
            </div>
          </motion.div>;
      case 2:
        return <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">
              Delivery Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => handleInputChange({
                  target: {
                    name: "locationType",
                    value: "lagos"
                  }
                })} className={`p-4 border rounded-lg text-center transition-all ${formData.locationType === "lagos" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
                    Lagos
                  </button>
                  <button onClick={() => handleInputChange({
                  target: {
                    name: "locationType",
                    value: "outside"
                  }
                })} className={`p-4 border rounded-lg text-center transition-all ${formData.locationType === "outside" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
                    Outside Lagos
                  </button>
                  <button onClick={() => handleInputChange({
                  target: {
                    name: "locationType",
                    value: "pickup"
                  }
                })} className={`p-4 border rounded-lg text-center transition-all ${formData.locationType === "pickup" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
                    Pickup
                  </button>
                </div>
              </div>
              {formData.locationType === "lagos" && <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zone
                    </label>
                    <select name="lagosZone" value={formData.lagosZone} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option value="">Select Zone</option>
                      <option value="island">Island</option>
                      <option value="mainland">Mainland</option>
                    </select>
                  </div>
                  {formData.lagosZone && <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area
                      </label>
                      <select name="bustop" value={formData.bustop} onChange={handleInputChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent">
                        <option value="">Select Area</option>
                        {LAGOS_AREAS[formData.lagosZone].map(area => <option key={area} value={area}>
                            {area}
                          </option>)}
                      </select>
                    </div>}
                </>}
              {formData.locationType === "outside" && (
                <>
                  {/* State Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {Object.keys(mappedData).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  {/* City Selection (appears after state is selected) */}
                  {formData.state && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select City</option>
                        {Object.keys(mappedData[formData.state as keyof typeof mappedData]).map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Pickup Point Selection (appears after city is selected) */}
                  {formData.city && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Point
                      </label>
                      <select
                        name="pickupPoint"
                        value={formData.pickupPoint}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select Pickup Point</option>
                        {Object.keys(mappedData[formData.state as keyof typeof mappedData][formData.city]).map(point => (
                          <option key={point} value={point}>{point}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Auto-filled Address (appears after pickup point is selected) */}
                  {formData.pickupPoint && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={mappedData[formData.state as keyof typeof mappedData][formData.city][formData.pickupPoint]}
                        className="w-full p-3 border rounded-md bg-gray-100"
                      />
                    </div>
                  )}
                </>
              )}
              {formData.locationType && formData.locationType !== "pickup" && <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Address
                  </label>
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Enter your detailed address" />
                </div>}
            </div>
          </motion.div>;
      case 3:
        return <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Payment</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              {cartItems.map(item => <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ₦{(item.price * item.quantity)}
                  </p>
                </div>)}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₦{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 mt-2">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4">
                  <span>Total</span>
                  <span>₦{total}</span>
                </div>
              </div>
            </div>
            {renderPaymentSection()}
          </motion.div>;
      default:
        return null;
    }
  };
  const renderPaymentSection = () => {
    return <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setPaymentMethod("card")} className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "card" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
            <CreditCard className="h-6 w-6" />
            <span>Pay with Card</span>
          </motion.button>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setPaymentMethod("bank")} className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "bank" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
            <Landmark className="h-6 w-6" />
            <span>Bank Transfer</span>
          </motion.button>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setPaymentMethod("ussd")} className={`p-6 border rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "ussd" ? "border-red-500 bg-red-50 text-red-700" : "hover:border-gray-300"}`}>
            <Hash className="h-6 w-6" />
            <span>USSD</span>
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {paymentMethod && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} className="bg-gray-50 p-6 rounded-lg">
              {paymentMethod === "card" && <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Card Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-3 border rounded-md" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input type="text" placeholder="123" className="w-full p-3 border rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>}
              {paymentMethod === "bank" && <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-lg mb-4">
                      Bank Transfer Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600">Bank Name</span>
                        <span className="font-medium">
                          {BANK_DETAILS.bankName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600">Account Name</span>
                        <span className="font-medium">
                          {BANK_DETAILS.accountName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span className="text-gray-600">Account Number</span>
                        <span className="font-medium">
                          {BANK_DETAILS.accountNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!hasTransferred && <div className="bg-white p-6 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Time Remaining
                      </h4>
                      <CountdownTimer initialMinutes={30} onComplete={() => {
                showToast("Transfer time expired. Please try again.", "error");
                setPaymentMethod("");
              }} />
                    </div>}
                  <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => {
              setHasTransferred(true);
              showToast("Thank you! We will verify your transfer shortly.", "success");
            }} className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2" disabled={hasTransferred}>
                    <CheckCircle className="h-5 w-5" />
                    <span>
                      {hasTransferred ? "Transfer Confirmed" : "I Have Transferred"}
                    </span>
                  </motion.button>
                </div>}
              {paymentMethod === "ussd" && <div className="space-y-4">
                  <h3 className="font-semibold text-lg">USSD Code</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                    <p className="text-3xl font-bold text-gray-900 mb-4">
                      {USSD_CODE}
                    </p>
                    <p className="text-sm text-gray-500">
                      Dial this code on your phone to complete the payment
                    </p>
                  </div>
                </div>}
            </motion.div>}
        </AnimatePresence>
        <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border border-gray-200">
          <input type="checkbox" id="saveAddress" checked={saveAddress} onChange={e => setSaveAddress(e.target.checked)} className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
          <label htmlFor="saveAddress" className="text-sm text-gray-600">
            Save delivery address for future orders
          </label>
        </div>
        <motion.button whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} onClick={handlePlaceOrder} className="w-full py-3 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center space-x-2">
          <ShoppingCart className="h-5 w-5" />
          <span>Place Order</span>
        </motion.button>
      </div>;
  };
  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && 
               formData.email && formData.phone;
      case 2:
        if (formData.locationType === "pickup") return true;
        if (formData.locationType === "lagos") {
          return formData.lagosZone && formData.bustop && formData.address;
        }
        if (formData.locationType === "outside") {
          return formData.state && formData.city && formData.pickupPoint;
        }
        return false;
      default:
        return true;
    }
  };
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(current => current + 1);
    } else {
      alert("Please fill in all required fields");
    }
  };
  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      showToast("Please select a payment method", "error");
      return;
    }
    if (paymentMethod === "bank" && !hasTransferred) {
      showToast("Please complete the bank transfer first", "warning");
      return;
    }
    handleSaveAddress();
    switch (paymentMethod) {
      case "card":
        showToast("Processing card payment...", "info");
        const sendCheckout = async () => {
          try {
            await axios.post(
              "https://semaine-backend.onrender.com/api/v1/orders",
              { formData, cartItems }
            );
            
          } catch (error) {
            console.error("Password reset failed:", error);
            throw error;
          };
        };
        sendCheckout();
        break;
      case "bank":
        showToast("Order placed! We will process it once transfer is verified.", "success");
        break;
      case "ussd":
        showToast(`Please dial ${USSD_CODE} to complete your payment`, "info");
        break;
    }
  };
  const handleCancelOrder = () => {
    const confirm = window.confirm("Are you sure you want to cancel your order?");
    if (confirm) {
      navigate("/cart");
    }
  };
  const handleSaveAddress = () => {
    if (saveAddress) {
      const addressToSave = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        locationType: formData.locationType,
        state: formData.state,
        lagosZone: formData.lagosZone,
        city: formData.city,
        pickupPoint: formData.pickupPoint,
        address: formData.address
      };
      localStorage.setItem("savedAddress", JSON.stringify(addressToSave));
    }
  };
  const showToast = (message: string, type: ToastType) => {
    setToast({
      message,
      type,
      isVisible: true
    });
    setTimeout(() => {
      setToast(prev => ({
        ...prev,
        isVisible: false
      }));
    }, 3000);
  };
  return <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-8">
                {[1, 2, 3].map(step => <React.Fragment key={step}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step <= currentStep ? "bg-red-600 text-white" : "bg-gray-200"}`}>
                      {step < currentStep ? <Check className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && <div className={`flex-1 h-1 mx-2 ${step < currentStep ? "bg-red-600" : "bg-gray-200"}`} />}
                  </React.Fragment>)}
              </div>
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
              <div className="flex justify-between mt-8">
                {currentStep > 1 && <button onClick={() => setCurrentStep(current => current - 1)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    Back
                  </button>}
                {currentStep < 3 ? <button onClick={handleNextStep} className="ml-auto px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Continue
                  </button> : <button onClick={handleCancelOrder} className="ml-auto px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Cancel Order
                  </button>}
              </div>
            </div>
          </div>
          <div className="lg:sticky lg:top-8 h-fit">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cartItems.map(item => <div key={item.id} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ₦{(item.price * item.quantity)}
                    </p>
                  </div>)}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₦{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 mt-2">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg mt-4">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={() => setToast(prev => ({
      ...prev,
      isVisible: false
    }))} />
    </div>;
};