// const urlProduct='http://localhost/wp532/getproductjson/';
// const urlPost='http://localhost/wp532/getpostjson/';
// const urlWp='http://localhost/wp532/apiwp/';
const urlSentMail= 'http://localhost/giaodien/contact/';
//this.includeJS('initFirebase.js');
// const urlProduct='https://vinut.maigia.vn/getproductjson/';
// const urlPost='https://vinut.maigia.vn/getpostjson/';
// const urlSentMail='https://vinut.maigia.vn/contact/';
const urlWp='http://vinut.maigia.vn/apiwp/';

var user ={
    name:'',
    phone:'',
    email:'',
    message:''
}
var error = [];
var productData = [];
var postData = [];
var menuData = [];
var data = [];
// this.loadData();
this.loadDataWp();

function includeJS(incFile)
{
   document.write('<script type="text/javascript" src="'+ incFile+ '"></script>');
}
function inCard(element){
    return `
    <div class="card px-3 col-12 col-md-6">
    <div class="card-wrapper media-container-row media-container-row">
        <div class="card-box">
            <div class="top-line pb-1">
                <h4 class="card-title mbr-fonts-style display-5">
                    ${element['title']}
                </h4>
                <p class="mbr-text card-title cost mbr-fonts-style m-0 display-5">
                    $400
                </p>
            </div>
            <div class="bottom-line">
                <p class="mbr-text mbr-fonts-style display-7">
                ${element['content']}
                </p>
            </div>
        </div>
    </div>
</div>
    `;
}
function product_list(){
    var ref = database.ref('tbl_Baiviet');
    var data;
    ref.once('value').then((adminSnap) => {    
        data = adminSnap.val();
       // console.log('data keys:',Object.keys(data));
       //  console.log('data:',Object.values(data));        
        let dulieu = Object.values(data) ;
        localStorage.setItem('product_list',JSON.stringify(dulieu));
        var xhtml = ``;
        dulieu.forEach((element)=>{
           // console.log('element:',element);
            xhtml = xhtml + this.inCard(element);        
        }) 
        
        document.getElementById("inCard").innerHTML = xhtml;
        
    });
}

function AddUser(user)
{
    this.checkUser(user);
    
    if(this.error.length === 0 ){
        // console.log('user:',user);
        var ref = database.ref('user-list');
        ref.push(user);
    }else{
        // console.log('error:',this.error);
        return;
    }
    

}   
function readUrl(url){
    // https://techblog.vn/gioi-thieu-ve-axios-mot-http-client-dua-tren-promise-cua-javascript
   axios.get(url)
  .then(response => {
    //console.log('data:',response.data);
  })
  .catch(error => console.log(error));
}
function getValues(id,name) {
    this.user[name] = document.getElementById(id).value ;     
    
}

function checkUser(user){
    this.error = [];
    for (const key in user) {
       if(user[key]===""){
        this.error.push(key);
       }
        
    }
}

function sendUser(user) {
    //console.log('user:',this.user);   
    this.sentMail(user);
    // alert('đã gửi mail:')
    
}

async function asyncFunc(url) {
    // fetch data from a url endpoint
    const data = await axios.get(url)
      .then((result) => {
        return result.data ;
      })  
    return data;
  }


function loadDataWp(){
   
   if(!sessionStorage.getItem('data')){
    let postData = this.asyncFunc(urlWp);
    Promise.all([postData]).then(values => { 
        sessionStorage.setItem('data',JSON.stringify(values));
        this.loadTemplate(values);
    })
    .catch(error => { 
        console.error(error.message)
    });
    }else{
        this.data = JSON.parse(sessionStorage.getItem('data'));        
        this.loadTemplate(this.data);
    }
   
}
function loadTemplate(data) {    
    if(data){
        this.menuData = data[0][0]['menu-primary'];
        itemsPost = data[0][1]['post'];
        itemsProduct = data[0][2]['product'];
        document.getElementById('header').innerHTML = this.loadHeader();
        document.getElementById('footer6-2g').innerHTML = this.loadFooter();    
        // xữ lý trang: 
        let pathname = window.location.pathname;
        if(pathname === "/") pathname = "/index.html";
        switch (pathname) {
            case '/index.html':
                this.loadPageHome(itemsProduct,itemsPost);
                break;
            case '/product.html':
                this.loadPageProduct(itemsProduct);
                break;
            case '/product-detail.html':
                this.loadPageProductDetail(itemsProduct);
                break;    
            case '/blogs.html':
                this.loadPageBlogs(itemsPost);
                break;    
            default:
            //   console.log('default');            
                break;
        }
    }else{
        alert('Không kết nối được dữ liệu');
        window.location.reload(); 
    }
    
    
   
}


function loadProduct(item) {
    //console.log('img:',item.img);
    // ${item.short_description}
    // ${item.price}
    return `
    <div class="card col-12 col-md-6 p-3 col-lg-3">
    <div class="card-wrapper">
        <div class="card-img">
            <a href="product-detail.html#${item.slug}"><img src="${item.img}" alt="Mobirise" title=""></a>
        </div>
        <div class="card-box">
            <h4 class="card-title mbr-fonts-style display-5">
            ${item.title} 
            </h4>
            <p class="mbr-text mbr-fonts-style display-7">
                
            </p>
            <!--Btn-->
            <div class="mbr-section-btn align-center">
                <a href="product-detail.html#${item.slug}" class="btn btn-warning-outline display-4">
                    Liên hệ 
                </a>
            </div>
        </div>
    </div>
</div>
    `;
}
function loadProductSlider(item) {
    //console.log('img:',item.img);
    // ${item.short_description}
    // ${item.price}
    return `

    <div class="card-wrapper">
        <div class="card-img">
            <a href="product-detail.html#${item.slug}"><img src="${item.img}" alt="Mobirise" title=""></a>
        </div>
        <div class="card-box">
            <h4 class="card-title mbr-fonts-style display-5">
            ${item.title} 
            </h4>
            <p class="mbr-text mbr-fonts-style display-7">
                
            </p>
            <!--Btn-->
            <div class="mbr-section-btn align-left">
                <a href="product-detail.html#${item.slug}" class="btn btn-warning-outline display-4">
                    Liên hệ 
                </a>
            </div>
        </div>
    </div>

    `;
}

function loadProductDetail(item) {
     
    return `
    <div class="col-md-12">
    <div class="media-container-row">
        <div class="mbr-figure" style="width: 50%;">
            <img src="${item.img}" alt="Mobirise" title="">
        </div>
        <div class="align-left aside-content">
            <h2 class="mbr-title pt-2 mbr-fonts-style display-5">${item.title}</h2>
            <div class="mbr-section-text">
                <p class="mbr-text text1 pt-2 mbr-light mbr-fonts-style display-7">${item.content}</p>
                
            </div>
            <!--Btn-->
            <div class="mbr-section-btn pt-3 align-left"><a href="index.html" class="btn btn-warning-outline display-4">Liên hệ</a></div>
        </div>
    </div>
</div>
    `;
}

function loadHeader(){
let inMenu = this.inMenu(this.menuData);    
return `
    <section class="menu cid-rWtxAy4wHg" once="menu" id="menu2-1r">   
    <nav class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm bg-color transparent">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>
        <div class="menu-logo">
            <div class="navbar-brand">                
                
            </div>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav nav-dropdown nav-right navbar-nav-top-padding" data-app-modern-menu="true">
                ${inMenu}            
            </ul>
            
        </div>
    </nav>
  </section>
    `;
}
function isSubMenu(id,menu) {
   find =  menu.filter(value => value.menu_item_parent === id.toString());
   return find;   
}
function inMenu(menu) {
    //console.log('menu:',menu);
    var xhtml = ``;
    var xhtmlSubMenuGoc =``;
    var xhtmlSubMenu= ``;
    console.log('find:',this.isSubMenu(23,menu));          
    menu.forEach((item)=>{
        console.log('item:',item.menu_item_parent);
        let url = item.url.replace('/','');
        var subMenu = this.isSubMenu(item.id,menu);        
        if(item.menu_item_parent === "0" && subMenu.length ===0 ) {
            xhtml = xhtml +  ` 
            <li class="nav-item"><a class="nav-link link text-black display-4" href="${url}">${item.title}</a></li>
            `;
        }
        if(item.menu_item_parent === "0" && subMenu.length > 0 ) {
            xhtmlSubMenuGoc  = xhtmlSubMenuGoc  + `<a class="nav-link link text-black dropdown-toggle display-4" data-toggle="dropdown-submenu" aria-expanded="false">
                            ${item.title}
                            </a>`;     
        }   
        if(subMenu.length > 0) {
            console.log('subMenu:',subMenu);            
            subMenu.forEach((itemSub)=>{
                xhtmlSubMenu=xhtmlSubMenu+`<a onclick="getproduct(this.text)" class="text-black dropdown-item display-4">${itemSub.title}</a>`;                    
            })    
            xhtml = xhtml + `<li class="nav-item dropdown">` + xhtmlSubMenuGoc + `<div class="dropdown-menu">` + xhtmlSubMenu + `</div></li>`
        }
        
    })
    return xhtml;
}


function loadFooter(){
  return `
    <div class="container">
    <div class="media-container-row align-center mbr-white">
    <div class="col-12">
        <p class="mbr-text mb-0 mbr-fonts-style display-7">
            © Copyright 2020 - All Rights Reserved
        </p>
    </div>
    </div>
    </div>
  `
}
function getproduct(value){
   value = this.to_slug(value);   
   if(window.location.href !== "product.html"){
    window.location.href = "product.html#"+value;
    window.location.reload(); 
   }
   window.location.href = "product.html#"+value;   
   
}

function to_slug(str)
{
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();     
 
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
 
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');
 
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');
 
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');
 
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
 
    // return
    return str;
}

function filterProduct(items,slug) {
    var product = [];
    items.forEach((item)=>{
        // console.log('item slug:',item['catePost']);
        if(item['catePost'] && item['catePost'].includes(slug) === true) {
            product.push(item);
        }       
    })
    return product;
}


function sanphamnoibat(itemsProduct) {
    let xhtmlProduct = ``;
    itemsProduct = this.filterProduct(itemsProduct,'san-pham-noi-bat');
  //  console.log('itemsProduct:',itemsProduct);    
    itemsProduct.forEach((item)=>{

        // xhtmlProduct = xhtmlProduct + this.loadProductSlider(item);
        xhtmlProduct = xhtmlProduct + this.loadProduct(item);
    })
   // document.getElementById('spnb-slider').innerHTML = xhtmlProduct ;
    document.getElementById('spnb').innerHTML = xhtmlProduct ;
}

function loadPost(item) {
    // ${item.content.slice(1,150)} ...
  return `
  <div class="card p-3 col-12 col-md-6 col-lg-4">
  <div class="card-wrapper ">
      <div class="card-img">
          <div class="mbr-overlay"></div>
          <div class="mbr-section-btn text-center"><a href="blogs.html#${item.slug}" class="btn btn-primary display-4">Tin tức - Sự kiện</a></div>
          <img src="${item.img}" alt="Mobirise">
      </div>
      <div class="card-box">
          <h4 class="card-title mbr-fonts-style display-7">${item.title}</h4>
          <p class="mbr-text mbr-fonts-style align-left display-7">
         <!--  -->
          </p>
      </div>
  </div>
</div>   `
}
function loadPostSlider(item) {
    // ${item.content.slice(1,150)} ...
  return `
    <div class="card-wrapper ">
      <div class="card-img">
          <div class="mbr-overlay"></div>
          <div class="mbr-section-btn text-center"><a href="blogs.html#${item.slug}" class="btn btn-primary display-4">Tin tức - Sự kiện</a></div>
          <img src="${item.img}" alt="Mobirise">
      </div>
      <div class="card-box">
          <h4 class="card-title mbr-fonts-style display-7">${item.title}</h4>
          <p class="mbr-text mbr-fonts-style align-left display-7">
         <!--  -->
          </p>
      </div>
    </div>
    `
}

function loadPostDetail(item) {
    return `
    <section class="mbr-section content4 cid-rWtMbGXphM" id="content4-2f" style="padding-bottom: 0px!important;">
    <div class="container">
    <div class="media-container-row">
    <div class="title col-12 col-md-8">
    <h2 class="align-center pb-3 mbr-fonts-style display-2">
    ${item.title}
    </h2>
    <h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
    ${item.the_date}
    </h3>

    </div>
    </div>
    </div>
    </section>
    <section class="cid-rWtM5DLqTy" id="content13-2c" style="padding-top: 0px!important; padding-bottom: 0px!important;">

    <div class="container">
    <div class="media-container-row" style="width: 66%;">
    <div class="img-item item1" style="width: 179%;">
    <img src="${item.img}">
    </div>

    </div>
    </div>
    </section>
    <section class="engine"><a href="https://mobirise.info/c">site builder</a></section>
    <section class="mbr-section article content1 cid-rWtLf8Xs5G" id="content1-2a">
    <div class="container">
    <div class="media-container-row">
    <div class="mbr-text col-12 mbr-fonts-style display-7 col-md-8">
    ${item.content}
    </div>
    </div>
    </div>
    </section>
    `
  }

function postHome(itemsPost) {
    let xhtmlPost = ``;
    itemsPost = this.filterPost(itemsPost,'post-noi-bat');
    itemsPost.forEach((item)=>{
    //    xhtmlPost = xhtmlPost + this.loadPostSlider(item);
         xhtmlPost = xhtmlPost + this.loadPost(item);
    })
 //   document.getElementById('post-home-slider').innerHTML = xhtmlPost ;
     document.getElementById('post-home').innerHTML = xhtmlPost ;
}

function filterPost(items,slug) {
    var post = [];
    items.forEach((item)=>{
        if(item['cateSlug'] && item['cateSlug'].includes(slug) === true ) {
            post.push(item);
           // console.log('item slug:',item['cateSlug']);
        }
    })
    return post; 
}
function sliderHome(itemsPost) {
    let items = this.filterPost(itemsPost,'banner-slider');
   // console.log("slider:",items); 
    let xhtml=  `
    <div class="full-screen">
    <div class="mbr-slider slide carousel" data-keyboard="false" data-ride="carousel" data-interval="4000" data-pause="true">
        <ol class="carousel-indicators">
            <li data-app-prevent-settings="" data-target="#slider1-j" class=" active" data-slide-to="0"></li>
            <li data-app-prevent-settings="" data-target="#slider1-j" data-slide-to="1"></li>
            <li data-app-prevent-settings="" data-target="#slider1-j" data-slide-to="2"></li>
            <li data-app-prevent-settings="" data-target="#slider1-j" data-slide-to="3"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item slider-fullscreen-image active" data-bg-video-slide="false" style="background-image: url(${items[0]['img']});">
                <div class="container container-slide">
                    <div class="image_wrapper"><img src="assets/images/soursop-1920x1080.jpg" alt="" title="">
                        <div class="carousel-caption justify-content-center">
                                <div class="col-10 align-right">
                                    <h2 class="mbr-fonts-style display-2">${items[0]['title']}</h2>
                                    <p style="width: 50%;margin-left: 57%;text-align: left;" class="lead mbr-text mbr-fonts-style display-5">
                                    ${items[0]['short_content']}
                                    </p>
                                    <div class="mbr-section-btn" buttons="0">
                                   
                                    <a class="btn  btn-white-outline display-4" href="index.html#form4-s">LIÊN HỆ</a></div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item slider-fullscreen-image" data-bg-video-slide="false" style="background-image: url(${items[1]['img']});">
                <div class="container container-slide">
                    <div class="image_wrapper"><img src="assets/images/mango-1904x905.jpg" alt="" title="">
                        <div class="carousel-caption justify-content-center">
                        <div class="col-10 align-right">
                        <h2 class="mbr-fonts-style display-2">${items[1]['title']}</h2>
                        <p style="width: 50%;margin-left: 57%;text-align: left;" class="lead mbr-text mbr-fonts-style display-5">
                        ${items[1]['short_content']}
                        </p>
                        <div class="mbr-section-btn" buttons="0">
                       
                        <a class="btn  btn-white-outline display-4" href="index.html#form4-s">LIÊN HỆ</a></div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item slider-fullscreen-image" data-bg-video-slide="false" style="background-image: url(${items[2]['img']});">
                <div class="container container-slide">
                    <div class="image_wrapper"><img src="assets/images/dragon-2-1904x905.jpg" alt="" title="">
                        <div class="carousel-caption justify-content-center">
                        <div class="col-10 align-right">
                        <h2 class="mbr-fonts-style display-2">${items[2]['title']}</h2>
                        <p style="width: 50%;margin-left: 57%;text-align: left;" class="lead mbr-text mbr-fonts-style display-5">
                        ${items[2]['short_content']}
                        </p>
                        <div class="mbr-section-btn" buttons="0">
                       
                        <a class="btn  btn-white-outline display-4" href="index.html#form4-s">LIÊN HỆ</a></div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item slider-fullscreen-image" data-bg-video-slide="false" style="background-image: url(${items[3]['img']});">
                <div class="container container-slide">
                    <div class="image_wrapper"><img src="assets/images/chanh-sa-1904x905.jpg" alt="" title="">
                        <div class="carousel-caption justify-content-center">
                        <div class="col-10 align-right">
                        <h2 class="mbr-fonts-style display-2">${items[3]['title']}</h2>
                        <p style="width: 50%;margin-left: 57%;text-align: left;" class="lead mbr-text mbr-fonts-style display-5">
                        ${items[3]['short_content']}
                        </p>
                        <div class="mbr-section-btn" buttons="0">
                       
                        <a class="btn  btn-white-outline display-4" href="index.html#form4-s">LIÊN HỆ</a></div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><a data-app-prevent-settings="" class="carousel-control carousel-control-prev" role="button" data-slide="prev" href="#slider1-j"><span aria-hidden="true" class="mbri-left mbr-iconfont"></span><span class="sr-only">Previous</span></a><a data-app-prevent-settings="" class="carousel-control carousel-control-next" role="button" data-slide="next" href="#slider1-j"><span aria-hidden="true" class="mbri-right mbr-iconfont"></span><span class="sr-only">Next</span></a></div>
</div>
    `
    document.getElementById('slider1-j').innerHTML = xhtml;
}

function gcnHome(itemsPost) {
    let items = this.filterPost(itemsPost,'giay-chung-nhan');
    //console.log("gcn:",items);    
    let gcn=``;
    items.forEach((item)=>{
        gcn = gcn + `
        <div class="col-sm-6 col-md-4 col-lg-3 item gallery-image">
        <div class="item-wrapper">
            <img class="w-100" src="${item.img}" alt="" data-slide-to="0" title="" data-target="#rWuWgpG4Yo">
        </div>
        </div>  
        `;        
    })  
    let xhtml=`
    <div class="container">  
    <h4 class="mbr-section-subtitle align-center pb-4 mbr-fonts-style display-5"><strong>CHỨNG NHẬN QUỐC TẾ.
        </strong></h4>
    <div class="row mbr-gallery" data-toggle="modal" data-target="#rWuWgpFxRW">
                  ${gcn}
    </div>  
    </div>
    `;
    document.getElementById('gallery5-p').innerHTML = xhtml;
}

function videoHome(itemsPost) {
    let items = this.filterPost(itemsPost,'video-home');
    console.log('video home:',items);
    
    //let urlYoutube = 'https://www.youtube.com/embed/iKWhgK0cXzw';
    let urlYoutube = items[0]['short_content'];
    let urlVideo = urlYoutube;
    let xhtml=`
    <figure class="mbr-figure align-center container">
    <div class="video-block" style="width: 82%;">
        <div>             
            <iframe width="910" height="720" src="${urlVideo}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
    </figure>
    
    `;
    document.getElementById('video2-r').innerHTML = xhtml;
}
function contactHome(itemsPost) {
    let items = this.filterPost(itemsPost,'contact');
    console.log("contact:",items);
    let xhtml=`
    <div class="container">
    <div class="row">
        <div class="col-md-6">
            ${items[0]['content']}
        </div>
        <div class="col-md-6">
            ${items[1]['content']}            
        </div>
    </div>
</div>
    `;
    document.getElementById('form4-s').innerHTML = xhtml;
}
function loadPageHome(itemsProduct,itemsPost) {
    this.sliderHome(itemsPost);
    this.gcnHome(itemsPost);
    this.videoHome(itemsPost);
    this.postHome(itemsPost);
    this.sanphamnoibat(itemsProduct);
    this.contactHome(itemsPost);
}
function loadPageProduct(itemsProduct) {
    let xhtmlProduct = ``;
  //  console.log('hash:',window.location.hash.replace("#",""));
    let slug = window.location.hash.replace("#","");
    itemsProduct = this.filterProduct(itemsProduct,slug);
  //  console.log('itemsProduct:',itemsProduct);            
    itemsProduct.forEach((item)=>{

        xhtmlProduct = xhtmlProduct + this.loadProduct(item);
    })
    document.getElementById('product-list').innerHTML = xhtmlProduct ;
}
function loadPageProductDetail(itemsProduct) {
 //   console.log('product-detail.html');
    let slug_detail = window.location.hash.replace("#","");
    itemsProduct = itemsProduct.find(value => value['slug'] === slug_detail );
  //  console.log('itemsProduct:',itemsProduct);           
    document.getElementById('product-detail').innerHTML = this.loadProductDetail(itemsProduct);
}
function loadPageBlogs(itemsPost) {
  //  console.log('blogs.html');
    let slug_post = window.location.hash.replace("#","");
    itemsPost = itemsPost.find(value => value['slug'] === slug_post );
  //  console.log('itemsPost:',itemsPost);           
    document.getElementById('blogs').innerHTML = this.loadPostDetail(itemsPost);
}
function sentMail(user) 
{
    axios({
        method: "post",
        url: urlSentMail,
        headers: { "content-type": "application/json" },
        data: user
      })
        .then(result => {
            console.log('result:',result.status);
            if(result.status === 200){
                alert('Đã gửi mail thành công');
                document.getElementById("myForm").reset();
            }else{
                alert('Gửi mail thất bại');
            }            
        })
        .catch(error => console.log('error',error) );    
}