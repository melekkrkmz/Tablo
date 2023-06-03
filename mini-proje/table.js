
// KİŞİLER TANIMLANIYOR
const user = [
    { id: 1, ad: "MELEK", soyad: "KORKMAZ", yas: 50 },
    { id: 2, ad: "SÜMEYYE", soyad: "TANRIVERDİ", yas: 26 },
    { id: 3, ad: "VEYSEL", soyad: "KORKMAZ", yas: 22 }
]
console.log(user)

// ÖNCELİKLE VERİLERİN YAZILACAĞI KISMI ÇAĞIRALIM

const tableContainar = document.getElementById("table-containar")

// şimdi bunları ekrana yazdıralım bunun için array obje içirisindeki verilerim üzerinde dön diyip ekrana yazdırmak için elemanları oluşturalım
// bütün verileri tek kalemde eğer yazmak istiyorsak kapsayıcı divini oluşturup içerideki verileri innerHtmle bağlayıp templatelerin arasına html verilerini girip
// oluşturduğumuz array obje ile işledik

// <!-- <tr>
// <th scope="row">1</th>
// <td>Mark</td>
// <td>Otto</td>
// <td>@mdo</td>
// </tr> -->

function tablo() {
    tableContainar.innerHTML = ""  //sayfanın sürekli çağrılmaması için tabloyu boşaltıyoruz..
    user.forEach(function (kullanıcılar,index) {
        //  tabloyu oluşturduk
        const tr = document.createElement("tr")
        tr.innerHTML +=
            `<th scope="row">${kullanıcılar.id}</th>
    <td>${kullanıcılar.ad}</td>
    <td>${kullanıcılar.soyad}</td>
    <td>${kullanıcılar.yas}</td>
    <td><button onclick="tekVeriSil(${index})"class="btn btn-danger">sil</button>
    <button onclick="veriAl(${kullanıcılar.id})" class='btn btn-warning'>güncelle</button></td>`

        tableContainar.appendChild(tr)
    })

}



tablo()


// içeriğe kullanıcı eklemek için kullanıcıdan verileri aldık

function veriAl(kullanıcıId) {

    let adSor = "Ad girin";
    let soyadSor = "Soyad girin"
    let yasSor = "Yaş girin"
    let userId = kullanıcıId;

    if (!userId) {
        userId = Date.now()
    }
    

    if (kullanıcıId) {
        //eğer userıd varsa kullanıcı güncelleniyordur
        adSor = "Adınızı güncelleyin";
        soyadSor = "Soyadınızı güncelleyin"
        yasSor = "Yaşınızı güncelleyin"


    }
 


    let isim = prompt(adSor)
    if (isim == null||isim.length<3) return  alert("3 harfeten az girilemez..");

    let soyad = prompt(soyadSor)
    if (soyad == null||soyad.length<3) return alert("3 harfeten az girilemez..");

    let yas = prompt(yasSor)
    if (yas == null||isNaN(yas)){return alert("lütfen geçerli bir sayı giriniz..")} //string ve boş girmesini engeller
    
    

    //  isim,soyisim ve yaş var ise bunları objeye çevir dedik ve obje olarak verielr gönder kısmına döndürdük
    if (isim && soyad && yas) {

        const objeOlarak = { id:userId, ad: isim, soyad: soyad, yas: yas }

        if (kullanıcıId) {
            //kullanıcııd varsa veriyi günceller iki parametre olarak gider.ikinci parametre güncelleme isteğine tekabül eder
            return verleriGönder(objeOlarak, true)
        } else {
            //kullanıcııd var ise veriler ekler
            return verleriGönder(objeOlarak)
        }


    }


}

function verleriGönder(objeOlarak, güncelle) {
    // aldığımız obje olarak buraya geldi.
    // console.log(objeOlarak) 
    if (güncelle) {
        const kullanici = user.find(function (data) {

            return data.id === objeOlarak.id
        })
        if (kullanici) {
            kullanici.ad = objeOlarak.ad
            kullanici.soyad = objeOlarak.soyad
            kullanici.yas = objeOlarak.yas
        } 

    }else{
        
        user.push(objeOlarak)
        // usera giden verileri tabloya yazdırmak için tablo fonksiyonunu döndürdük.

    }
    return tablo()

}

// her butona tıklandığında kullanıcıdan aldığımız verilerin çalışması için butona bir onclikck olayı verdik

const ekle = document.getElementById("ekle")
ekle.onclick = function () {

    veriAl() //kullanıcıdan gelen verilerin butana tıklandığında çalışması için fonksiyonu çağırdık

}
// verileri silmek için butona tıklanma olayı verdik,bütün verileri silmek içinde var olan veriler array içinde olduğu için 
// uzunkuğunu baz alarak 0 eşitledik,ve taployu geri çağırdık
const verileriSil = document.querySelector("#sil").onclick = function () {

    user.length = 0;
    return tablo()
}

//bu butonu düzenle 
function tekVeriSil(index) {

    user.splice(index,1)
    return tablo()
}
//yaşa göre sırala
const sırala=document.getElementById("sırala")
sırala.onclick=function(){
    
   user.sort((a,b)=>{
       return a.yas-b.yas
     
    })
    return tablo()
}



