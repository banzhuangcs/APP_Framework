<?php
$page = addslashes($_GET['page']);
$id = 0;

if (isset($page)) {
  if ($page == 4) {
    echo json_encode(array('data' => array()));
  } else {
    echo json_encode(array(
      'data' => array(
        array(
          'id' => ++$id,
          'username' => '挖掘机',
          'imgPath' => '',
          'comment' => '八路军就拉大栓啊！瞄了一个准！打死个翻译官,火车道就开到济南啊~',
          'commentCount' => 100,
          'likeCount' => 300
        ),
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Card/img.jpg',
          'comment' => '',
          'username' => '挖掘机',
          'commentCount' => 100,
          'likeCount' => 300
        )
      )
    ));
  }
}