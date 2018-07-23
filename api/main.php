<?php

header("Access-Control-Allow-Origin: *");

class API {

    private $serverUrl = "https://swapi.co/api/";


    public function makeCall($endpoint, $method = "GET"){

        $args = "";

        if(count($this->args) > 0){
            $args = $this->buildQuery($this->args);
        }

        $url = $this->serverUrl.$endpoint."/?".$args;


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $result = curl_exec($ch);
        curl_close($ch);

        echo $result;
    }

    public function buildQuery($args){
        return http_build_query($args, '', '&');
    }

}


class Router extends API {

    public $args = [];

    public function __construct(){

        $function = strtolower($_SERVER['REQUEST_METHOD']."_".substr($_SERVER['REDIRECT_URL'], 1));

        if(method_exists($this, $function) && is_callable(array($this, $function))){

            foreach(explode('&', $_SERVER['REDIRECT_QUERY_STRING']) as $param){
                $arg = explode('=', $param);

                if(!empty($arg[0])){
                    $this->args[$arg[0]] = $arg[1];
                }
            }

            http_response_code(200);

            $this->$function();
        }

    }

    public function get_people(){
        $this->makeCall('people');
    }

    public function get_planets(){
        $this->makeCall('planets');
    }

    public function get_starships(){
        $this->makeCall('starships');
    }

    public function get_search(){
        if(isset($this->args["search"])){
            $this->makeCall('people');
        }
    }


}


$router = new Router();

?>