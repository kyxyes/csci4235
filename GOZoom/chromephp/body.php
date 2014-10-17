<?php
$text = $_POST['webdata'];


    if(eregi("<title>(.*)</title>", $text, $array)){
        $title=$array[0];
      }
      $title = substr($title, 7,-8);

 // this is for pic ======begin   
$search="/<img src=(.+?)>/is";
$re=array();
$match=preg_match_all($search,$text,$re);
$count=count($re[0]);
for ($i=0;$i<=$count;$i++){
$pic = $pic.$re[0][$i];
}


// this is for pic =========end


    $text = preg_replace("/<style>.+<\/style>/is", "", $text);
    $search = array ("'<script[^>]*?>.*?</script>'si",  // 去掉 javascript
                 "'<[\/\!]*?[^<>]*?>'si",           // 去掉 HTML 标记
                 "'([\r\n])[\s]+'",                 // 去掉空白字符
                 "'&(quot|#34);'i",                 // 替换 HTML 实体
                 "'&(amp|#38);'i",
                 "'&(lt|#60);'i",
                 "'&(gt|#62);'i",
                 "'&(nbsp|#160);'i",
                 "'&(iexcl|#161);'i",
                 "'&(cent|#162);'i",
                 "'&(pound|#163);'i",
                 "'&(copy|#169);'i");
                 //"'&#(\d+);'e");                    // 作为 PHP 代码运行

$replace = array ("",
                  "",
                  "\\1",
                  "\"",
                  "&",
                  "<",
                  ">",
                  " ",
                  chr(161),
                  chr(162),
                  chr(163),
                  chr(169));
                 // "chr(\\1)");
$text = preg_replace ($search, $replace, $text);

    echo 
          "
          <div id = 'title' 
          style ='border-radius:5px;border: 2px solid #8b9dc3;background-color:#8b9dc3;color:#ffffff;font-family:fantasy;float:right;'><B>Powered by YUXIN KANG </div>
          </br>".$title."</B>
          </br>".$pic."</br><div id = 'body' style ='color:#5974a2'>".$text."<div>";

?>