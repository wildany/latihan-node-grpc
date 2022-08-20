/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos/helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const { result } = require('lodash');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

var PROTO_PATH2 = __dirname + '/../../protos/hitung_luas.proto';
var packageDefinition2 = protoLoader.loadSync(
  PROTO_PATH2,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });

  var luas_proto = grpc.loadPackageDefinition(packageDefinition2).helloworld;
/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

function sayHelloAgain(call, callback) {
  callback(null, {message: "Hello again, " + call.request.name});
}

function luasPersegiPanjang(call, callback) {
  callback(null, hitungPersegiPanjang(call.request));
}

function hitungPersegiPanjang(request){
  var hasil;
  hasil = request.panjang * request.lebar;

  const result = {
    message : 'success',
    luas : hasil,
  };

  return result;
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(luas_proto.Greeter.service, {
    sayHello: sayHello, 
    sayHelloAgain: sayHelloAgain,
    luasPersegiPanjang : luasPersegiPanjang});
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
