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

function get_nav_data($con, $query)
{
    $result = mysqli_query($con, $query);
    $data = array();
    while ($row = mysqli_fetch_array($result)) {

        $data[] = array(
            'item' => $row['nav_item'],
            'name' => $row['nav_name']
        );

    }
    return $data;
}

function get_content_data($con, $query)
{
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

function get_other_news()
{
    $data = array();
    for ($i = 0; $i < 3; $i++) {
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


function get_final_news_link()
{
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


function get_news_data($con, $query)
{
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
            'type' => 'news_link',
            'id' => $row['id'],
            'content' => $row['title'] . ' (' . $row['date'] . ')'
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
    $other_news_data = get_other_news();
    $final_link = 'final_link';
    $data[$final_link] = get_final_news_link();
    $data[$other_news] = $other_news_data;

    return $data;
}


function get_apps_data($con, $query)
{
    $result = mysqli_query($con, $query);
    $data = array();
    while ($row = mysqli_fetch_array($result)) {

        $data[] = array(
            'name' => $row['name'],
            'app_name' => $row['app_name'],
            'code' => $row['code'],
            'ios' => $row['ios_link'],
            'android' => $row['android_link'],
            'amazon' => $row['amazon_link'],
            'faq' => filter_var($row['faq'], FILTER_VALIDATE_BOOLEAN),
            'help' => filter_var($row['help'], FILTER_VALIDATE_BOOLEAN),
            'media' => filter_var($row['media'], FILTER_VALIDATE_BOOLEAN),
            'game_help' => filter_var( $row['game_help'], FILTER_VALIDATE_BOOLEAN)


        );

    }
    return $data;
}


// GET NAV
// use mega instead of me for mega web....
$query_nav = "SELECT * FROM nav_mega";
$nav_data = get_nav_data($con, $query_nav);
$core_data['nav'] = $nav_data;

// CONTENT
foreach ($nav_data as $item) {
    $table = $item['item'];
    $name = $item['name'];
    if ('news' == $name) {
        /// do news and news curent_content

        $query = "SELECT * FROM $table";
        $news_data = get_news_data($con, $query);
        $core_data[$name] = $news_data;
        continue;
    }

    $query = "SELECT * FROM $table";
    $con_data = get_content_data($con, $query);
    $core_data[$name] = $con_data;
}

// APPS

$query_apps = "SELECT * FROM apps";
$apps_data = get_apps_data($con, $query_apps);
$core_data['apps'] = $apps_data;

foreach ($apps_data as $app){
    $code = $app['code'];
    // ADD APPS ABOUTS FOR EACH APP
    $about = 'about_'.$code;
    $about_query = "SELECT * FROM $about";
    $about_data = get_content_data($con, $about_query);
    $core_data[$about] = $about_data;



    // ADD FAQ GAME_HELP
    if($app['faq']==1){
        $faq = 'faq_'.$code;
        $faq_query = "SELECT * FROM $faq";
        $faq_data = get_content_data($con, $faq_query);
        $core_data[$faq] = $faq_data;
    }

    
    // ADD HELPS FOR APPS WITH HELP
    if($app['help']==1) {
        $help = 'help_' . $code;
        $help_query = "SELECT * FROM $help";
        $help_data = get_content_data($con, $help_query);
        $core_data[$help] = $help_data;
    }

    // ADD GAME_HELP
    if($app['game_help']==1) {
        $game_help = 'game_help_' . $code;
        $game_help_query = "SELECT * FROM $game_help";
        $game_help_data = get_content_data($con, $game_help_query);
        $core_data[$game_help] = $game_help_data;
    }

    if($app['media']==1) {
        $media = 'media_' . $code;
        $media_query = "SELECT * FROM $media";
        $media_data = get_content_data($con, $media_query);
        $core_data[$media] = $media_data;
    }
    
    

}


// ADD APPS ABOUTS FOR EACH APP

// ADD HELPS FOR APPS WITH HELP

// ADD GAME_HELP

// create -- add apps ontent


echo json_encode($core_data);
