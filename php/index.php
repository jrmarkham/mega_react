<?php
/**
 * Returns the dataObject.
 */
require 'database.php';


//function get_core_data($con, $query){
//$result = mysqli_query($con, $query);
//  $data = array();
//    while ($row = mysqli_fetch_array($result)) {
//      $data = array(
//        'title' => $row['title'],
//        'subtitle' => $row['subtitle']
//      );
//    }
//     return $data;
//}

function get_nav_data($con, $query){
  $result = mysqli_query($con, $query);
  $data = array();
  while ($row = mysqli_fetch_array($result)) {

    $data[] = array(
      'item' =>  $row['nav_item'],
      'name' => $row['nav_name']
    ) ;

  }
  return $data;
}

function get_content_data($con, $query){
  $result = mysqli_query($con, $query);
  $data = array();
  while ($row = mysqli_fetch_array($result)) {
    $data[] = array(
      'type' => $row['type'],
      'content' => $row['content'],
      'link' => $row['link']
    );
  }
  return $data;
}

function get_other_news(){
  $data = array();
  for($i=0; $i<3; $i++){
    $data[] = array(
      'type' => 'break',
      'content' => '',
      'link' => ''
    );
  }

  $data[] = array(
    'type' => 'text',
    'content' => 'In Other News . . . ',
    'link' => ''
  );

  return $data;
}


function get_final_news_link(){
  $data = array();
  $data[] = array(
    'type' => 'break',
    'content' => '',
    'link' => ''
  );
  $data[] = array(
    'type' => 'break',
    'content' => '',
    'link' => ''
  );
  $data[] = array(
    'type' => 'link_name_short',
    'content' => 'Sign Up for News Updates',
    'link' => 'https://seu2.cleverreach.com/f/176697-173570/'
  );

  return $data;
}



function get_news_data($con, $query){
  $result = mysqli_query($con, $query);
  $data = array();
  $links = array();
  $count = 0;
  while ($row = mysqli_fetch_array($result)) {
    $count++;
    $id = $row['id'];
    $content_query = "SELECT * FROM news_content WHERE news_id=$id";
    $news_content = get_content_data($con, $content_query);
    $links[] = array(
      'type'=>'news_link',
      'id' => $row['id'],
      'content' => $row['title']. ' ('.$row['date'].')'
    );

    $data[] = array(
      'id' => $row['id'],
      'title' => $row['title'],
      'date' => $row['date'],
      'content' => $news_content
    );
  }
  $new_links = 'news_links';
  $data[$new_links] = array_reverse($links);
  $news_count = 'news_count';
  $data[$news_count] = $count;
  $other_news = 'other_news';
  $other_news_data =  get_other_news();
  $final_link = 'final_link';
  $data[$final_link] = get_final_news_link();
  $data[$other_news] = $other_news_data;

  return $data;
}


// GET NAV
$query_nav = "SELECT * FROM nav_me";
$nav_data = get_nav_data($con, $query_nav);
$core_data['nav']=$nav_data;

// CONTENT
foreach ($nav_data as $item){
  $table = $item['item'];
  $name = $item['name'];
  if('news'== $name){
    /// do news and news content

    $query = "SELECT * FROM $table";
    $news_data = get_news_data($con, $query);
    $core_data[$name] = $news_data;
    continue;
  }

  $query = "SELECT * FROM $table";
  $con_data = get_content_data($con, $query);
  $core_data[$name]= $con_data;
}




echo json_encode($core_data);
