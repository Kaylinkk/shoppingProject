
import requests
from bs4 import BeautifulSoup
import re




def ssg_site():
    # getting the html
    ssg_result = requests.get("https://www.ssg.com/disp/category.ssg?ctgId=6000092894")
    html = ssg_result.text
    ssg_soup = BeautifulSoup(html, 'html.parser')

    # extract the information

    product_name = [productname.text for productname in ssg_soup.select('div > a > em.tx_ko')]
    product_price = [price.text for price in  ssg_soup.select('div > em')]
    product_image = [ "http:"+ image.get('src') for image in ssg_soup.select('div > a > img.i1')]
    product_link = ["http://ssg.com" + link.get('href') for link in ssg_soup.select('div.thmb > a')]
    data_result = [{
		'site' : "ssg",
        'image' : product_image[i],
		'name' : product_name[i],
		'price' : product_price[i],	
		'link' : product_link[i]
		} for i in range(len(product_name))]
    return(data_result) 


def eleven_site():
    eleven_result = requests.get("https://www.11st.co.kr/category/DisplayCategory.tmall?method=getDisplayCategory2Depth&dispCtgrNo=1129504#")
    html= eleven_result.text
    eleven_soup = BeautifulSoup(html, 'html.parser')
    product_name = [productname.text for productname in eleven_soup.select('.info_tit > a')]
    product_price = [price.text for price in  eleven_soup.select('.sale_price')]
    product_image = [image.get('src') for image in eleven_soup.select('div > a > img')]
    product_link = [link.get('href') for link in eleven_soup.select('div.photo_wrap> a')]
    data_result = [{
		'site' : "11 street",
        'image' : product_image[i],
		'name' : product_name[i],
		'price' : product_price[i],	
		'link' : product_link[i]
		} for i in range(len(product_name))]
    return(product_name) 


def navershopping_site():
    navershopping_result = requests.get("https://search.shopping.naver.com/search/category/100007527")
    html= navershopping_result.text 
    navershopping_soup = BeautifulSoup(html, 'html.parser')
    product_name = [productname.text for productname in navershopping_soup.select('.basicList_link__1MaTN')]
    product_price = [price.text for price in  navershopping_soup.select('.sale_price')]
    product_image = [image.get('src') for image in navershopping_soup.select('div > a > img')]
    product_link = [link.get('href') for link in navershopping_soup.select('div.photo_wrap> a')]
    data_result = [{
		'site' : "11 street",
        'image' : product_image[i],
		'name' : product_name[i],
		'price' : product_price[i],	
		'link' : product_link[i]
		} for i in range(len(product_name))]
    return(data_result) 


def nonghyupmall():
    req = requests.get('http://www.nonghyupmall.com/')
    html = req.text
    soup = BeautifulSoup(html, 'html.parser')
    name = [name.text for name in soup.select('div > a > p')][:2]
    price = [re.search(r'\d*,*\d+', price.text) for price in soup.select('div > p.product-price-sale')][:2]
    image = [image.get('src') for image in soup.select('div.product-thumb > img')][:2]
    link = ['http://www.nonghyupmall.com/BC14010R/viewDetail.nh?wrsC=' + code.get('data-wrs-c') +'&basketCnt=0' for code in soup.select('div.product-info-area > a')][:2]
    data_result = [{
	    'site' : "nonghyup",
	    'name' : name[i],
	    'price' : price[i].group(),
	    'image' : image[i],
	    'link' : link[i]
	    } for i in range(len(name))]
    return(data_result) 



def get_all_result():
    ssg = ssg_site()
    eleven = eleven_site()
    naver = navershopping_site()
    nonghyup = nonghyupmall()
    result = ssg+ eleven + naver+ nonghyup
    return result
