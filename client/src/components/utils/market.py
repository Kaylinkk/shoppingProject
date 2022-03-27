
from turtle import title
import requests
from bs4 import BeautifulSoup
import re
import sys
# from pymongo import MongoClient

# mongodb_URI = "mongodb+srv://kaylin:kaylin2014@website.quwpk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
# client = MongoClient(mongodb_URI)
# db = client.website
# collection = db.products


title = sys.argv[1]

def ssg_site(title):
    # getting the html
    ssg_result = requests.get("https://www.ssg.com/search.ssg?target=all&query="+title)
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


def eleven_site(title):
    eleven_result = requests.get("https://search.11st.co.kr/Search.tmall?kwd="+title)
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


def navershopping_site(title):
    navershopping_result = requests.get("https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery="+title)
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


def nonghyupmall(title):
    req = requests.get('http://www.nonghyupmall.com/BC1F010M/srchTotalList.nh?searchTerm_main='+title )
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



def get_all_result(title):
    ssg = ssg_site(title)
    eleven = eleven_site(title)
    naver = navershopping_site(title)
    nonghyup = nonghyupmall(title)
    result = ssg+ eleven + naver+ nonghyup
    return result

	
sys.stdout.write(get_all_result)

