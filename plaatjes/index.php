<?php
echo json_encode(preg_grep("/\.(png|jpg|jpeg|gif)$/",array_slice(scandir('.'), 2)));
