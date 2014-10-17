
<?php
#$url = "http://www.hoverreader.com";
$url = $_POST['url']; #通过$_POST得到JQuery发送过来的url
if(is_null($url)) echo "wrong";
else{
$lines = file($url);
foreach ($lines as $line_num => $line) {
   #echo  htmlspecialchars($line);

	echo $line;
}
}

?>