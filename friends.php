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
          'type' => 'A',
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'A-挖掘机'
        ),
        array(
          'id' => ++$id,
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'A-掘机'
        ),
        array(
          'id' => ++$id,
          'type' => 'B',
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'B-挖掘机'
        ),
        array(
          'id' => ++$id,
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'B-掘机'
        ),
        array(
          'id' => ++$id,
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'B-W挖掘机'
        ),
        array(
          'id' => ++$id,
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'B-W掘机'
        ),
        array(
          'id' => ++$id,
          'type' => 'D',
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'B-挖掘机'
        ),
        array(
          'id' => ++$id,
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'B-掘机'
        ),
        array(
          'id' => ++$id,
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'B-W挖掘机'
        ),
        array(
          'id' => ++$id,
          'imgPath' => './app/components/Business/Card/img.jpg',
          'comment' => '我是彭于晏不是吴彦祖',
          'username' => 'B-W掘机'
        )
      )
    ));
  }
}