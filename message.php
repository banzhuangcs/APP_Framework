<?php
$page = addslashes($_GET['page']);
$id = 0;

if (isset($page)) {
  if ($page == 6) {
    echo json_encode(array('data' => array()));
  } else {
    echo json_encode(array(
      'data' => array(
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Message/img.jpg',
          'title' => '莫得有伐',
          'readCount' => 100,
          'commentCount' => 300
        ),
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Message/img.jpg',
          'title' => '莫得有伐',
          'readCount' => 100,
          'commentCount' => 300
        ),
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Message/img.jpg',
          'title' => '莫得有伐',
          'readCount' => 100,
          'commentCount' => 300
        ),
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Message/img.jpg',
          'title' => '莫得有伐',
          'readCount' => 100,
          'commentCount' => 300
        ),
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Message/img.jpg',
          'title' => '莫得有伐',
          'readCount' => 100,
          'commentCount' => 300
        ),
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Message/img.jpg',
          'title' => '莫得有伐',
          'readCount' => 100,
          'commentCount' => 300
        ),
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Message/img.jpg',
          'title' => '莫得有伐',
          'readCount' => 100,
          'commentCount' => 300
        ),
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Message/img.jpg',
          'title' => '莫得有伐',
          'readCount' => 100,
          'commentCount' => 300
        ),
        array(
          'id' => ++$id,
          'imgPath' => 'components/Business/Message/img.jpg',
          'title' => '莫得有伐',
          'readCount' => 100,
          'commentCount' => 300
        )   
      )
    ));
  }
}