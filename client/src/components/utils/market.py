import requests
from bs4 import BeautifulSoup
import re

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
print(html) 