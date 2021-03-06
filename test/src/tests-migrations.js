/* eslint-disable quotes */
var TestsCore = require('./tests-core'),
    apiKey = TestsCore.apiKey,
    testMPID = TestsCore.testMPID,
    v1CookieKey = TestsCore.v1CookieKey,
    v1localStorageKey = TestsCore.v1localStorageKey,
    v2CookieKey = TestsCore.v2CookieKey,
    v3CookieKey = TestsCore.v3CookieKey,
    getLocalStorageProducts = TestsCore.getLocalStorageProducts,
    workspaceCookieName = TestsCore.workspaceCookieName,
    setCookie = TestsCore.setCookie,
    setLocalStorage = TestsCore.setLocalStorage,
    getEvent = TestsCore.getEvent,
    v3LSKey = TestsCore.v3LSKey,
    findCookie = TestsCore.findCookie,
    v4CookieKey = TestsCore.v4CookieKey,
    LocalStorageProductsV4 = TestsCore.LocalStorageProductsV4,
    LocalStorageProductsV4WithWorkSpaceName = TestsCore.LocalStorageProductsV4WithWorkSpaceName,
    server = TestsCore.server;

describe('persistence migrations from SDKv1 to SDKv2', function() {
    var mP = mParticle.persistence;
    var les = new Date().getTime();

    var SDKv1CookieV1 = '%7B%22sid%22%3A%22e46162ec-6aec-406e-a8ba-919cacb2ec2e%22%2C%22ie%22%3Atrue%2C%22sa%22%3A%7B%22sa1%22%3A%22value1%22%7D%2C%22ua%22%3A%7B%22attr1%22%3A%22value1%22%7D%2C%22ui%22%3A%5B%7B%22Identity%22%3A%22test%40email.com%22%2C%22Type%22%3A7%7D%2C%7B%22Identity%22%3A%22customerid1%22%2C%22Type%22%3A1%7D%5D%2C%22ss%22%3A%7B%22uid%22%3A%7B%22Expires%22%3A%222027-10-31T16%3A35%3A16.119943Z%22%2C%22Value%22%3A%22g%3Dced3bf8b-feb3-4e11-9ad3-8bc9060d5f37%26u%3D1621014208195017243%26cr%3D4122275%22%7D%7D%2C%22dt%22%3A%22' + apiKey + '%22%2C%22les%22%3A' + les + '%2C%22av%22%3A%221.5.0%22%2C%22cgid%22%3A%223645bd15-6790-435e-9a85-2a6cb28d3a0b%22%2C%22das%22%3A%22ced3bf8b-feb3-4e11-9ad3-8bc9060d5f37%22%2C%22csd%22%3A%7B%2211%22%3A1509640513335%7D%2C%22mpid%22%3A%22' + testMPID + '%22%2C%22cp%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%2C%22Attributes%22%3Anull%7D%2C%7B%22Name%22%3A%22Android%22%2C%22Sku%22%3A%22SKU2%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%2C%22Attributes%22%3Anull%7D%2C%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%2C%7B%22Name%22%3A%22Android%22%2C%22Sku%22%3A%22SKU2%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%2C%22pb%22%3A%7B%22pb1%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%7D%7D';

    var SDKv1CookieV2 =
    '%7B%22sid%22%3A%22cebf1fa5-0e90-42dc-bd68-f9d4f9556c97%22%2C%22ie%22%3Atrue%2C%22sa%22%3A%7B%22sa1%22%3A%22value1%22%7D%2C%22ua%22%3A%7B%22attr1%22%3A%22value1%22%7D%2C%22ui%22%3A%5B%7B%22Identity%22%3A%22customerid1%22%2C%22Type%22%3A1%7D%2C%7B%22Identity%22%3A%22test%40email.com%22%2C%22Type%22%3A7%7D%5D%2C%22ss%22%3A%7B%22uid%22%3A%7B%22Expires%22%3A%222027-10-31T17%3A43%3A24.385099Z%22%2C%22Value%22%3A%22g%3Dd9daebb0-46bd-457e-a510-f5b38434d013%26u%3D-6879874738958367199%26cr%3D4122343%22%7D%7D%2C%22dt%22%3A%22' + apiKey + '%22%2C%22les%22%3A' + les + '%2C%22av%22%3Anull%2C%22cgid%22%3A%2215997eed-a6e8-4b5d-9ff0-692a5b6601cf%22%2C%22das%22%3A%22d9daebb0-46bd-457e-a510-f5b38434d013%22%2C%22csd%22%3A%7B%2211%22%3A1509644604385%7D%2C%22mpid%22%3A%22' + testMPID + '%22%7D';

    var SDKv1CookieV3 = '{"sid":"cc3e7de7-67d0-4581-b4ae-242e8773f0a4"|"ie":1|"sa":"eyJzYTEiOiJ2YWx1ZTEifQ=="|"ua":"eyJhdHRyMSI6InZhbHVlMSJ9"|"ui":"eyIxIjoiY3VzdG9tZXJpZDEiLCI3IjoidGVzdEBlbWFpbC5jb20ifQ=="|"ss":"eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjctMTAtMzFUMTk6MzI6NTguNjA1NzkxWiIsIlZhbHVlIjoiZz1iMTNjNmZkNS05ZjBiLTQ3NGEtODQzZi1jY2RlZDAxZmY5ZDgmdT0tODI2NDc2MDM5ODIzNzQwNTMzMyZjcj00MTIyNDUyIn19"|"dt":"' + apiKey + '"|"les":' + les + '|"av":"1.5.0"|"cgid":"63781306-983e-4bec-8b0c-2c58b14f6d4e"|"das":"b13c6fd5-9f0b-474a-843f-ccded01ff9d8"|"csd":"eyIxMSI6MTUwOTY1MTE3ODYwNX0="|"mpid":"' + testMPID + '"}';

    var SDKv1CookieV3Full = '{"cp":[{"Name":"iPhone"|"Sku":"SKU1"|"Price":1|"Quantity":1|"TotalAmount":1|"Attributes":null}|{"Name":"Android"|"Sku":"SKU2"|"Price":1|"Quantity":1|"TotalAmount":1|"Attributes":null}]|"pb":{"pb1":[{"Name":"HTC"|"Sku":"SKU3"|"Price":1|"Quantity":1|"TotalAmount":1|"Attributes":null}]}|"sid":"045af0fa-8f05-43fa-a076-28bdc1d5ec3e"|"ie":1|"sa":"eyJzYTEiOiJ2YWx1ZTEifQ=="|"ua":"eyJ1YTEiOiJ2YWx1ZTEifQ=="|"ui":"eyI3IjoidGVzdEBlbWFpbC5jb20ifQ=="|"ss":"eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjctMTEtMDFUMTk6NDI6NDkuNjc5NDQyWiIsIlZhbHVlIjoiZz02ZmZmZDNmNC0yY2UxLTQ3NDYtODU3ZS05OTE4ZGY3ZDRjNWQmdT0zNDgyMDExODE1OTQ5MDc5MDc0JmNyPTQxMjM5MDIifX0="|"dt":"' + apiKey + '"|"les":' + les + '|"av":"1.5.0"|"cgid":"76bd51b3-7dad-491f-9620-0c57223a4e9f"|"das":"6fffd3f4-2ce1-4746-857e-9918df7d4c5d"|"csd":"eyIxMSI6MTUwOTczODE2ODI0NX0="|"mpid":"' + testMPID + '"}';

    // var SDKv1CookieV3LSProdOnly = '{"cp":[{"Name":"iPhone"|"Sku":"SKU1"|"Price":1|"Quantity":1|"TotalAmount":1|"Attributes":null}|{"Name":"Android"|"Sku":"SKU2"|"Price":1|"Quantity":1|"TotalAmount":1|"Attributes":null}]|"pb":{"pb1":[{"Name":"iPhone"|"Sku":"SKU1"|"Price":1|"Quantity":1|"TotalAmount":1|"Attributes":null}]}|"sid":"d41941c3-2f0a-40fb-b292-60de73a7f913"|"ie":1|"sa":"eyJzYTEiOiJ2YWx1ZTEifQ=="|"ua":"eyJhdHRyMSI6InZhbHVlMSJ9"|"ui":"eyIxIjoiY3VzdG9tZXJpZDEiLCI3IjoidGVzdEBlbWFpbC5jb20ifQ=="|"ss":"eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjctMTAtMzFUMjE6MjI6NTIuMTY2MjJaIiwiVmFsdWUiOiJnPWZjYjIzYmIyLTljM2UtNGNjNC1iOGQ1LTFhNTNkMjc2OGUwMSZ1PTMxMTEyODg1MzY5MjI5MjQ2NiZjcj00MTIyNTYyIn19"|"dt":"' + apiKey + '"|"les":' + les + '|"av":"1.5.0"|"cgid":"8b899cc3-e823-4b48-afc7-2f59469f1ae3"|"das":"fcb23bb2-9c3e-4cc4-b8d5-1a53d2768e01"|"csd":"eyIxMSI6MTUwOTY1Nzc3MjE0OX0="|"mpid":"' + testMPID + '"}';

    var SDKv2CookieV1 = '%7B%22globalSettings%22%3A%7B%22currentSessionMPIDs%22%3A%5B%228179891178059554209%22%2C%224573473690267104222%22%5D%2C%22sid%22%3A%22294c8c34-328a-4285-9590-9014af35c843%22%2C%22ie%22%3Atrue%2C%22sa%22%3A%7B%22sa1%22%3A%22value1%22%7D%2C%22ss%22%3A%7B%7D%2C%22dt%22%3A%22' + apiKey + '%22%2C%22les%22%3A' + les + '%2C%22av%22%3Anull%2C%22cgid%22%3A%22d19cf18e-fda3-4e75-976d-a9a7028f33bc%22%2C%22das%22%3A%229c9ddd32-5873-4dfd-8221-0d31a16f6a27%22%2C%22c%22%3A%22%22%7D%2C%228179891178059554209%22%3A%7B%22ua%22%3A%7B%22ua1%22%3A%22value1%22%7D%2C%22ui%22%3A%7B%22email%22%3A%22test%40email.com%22%2C%22customerid%22%3A%22customerid1%22%7D%2C%22csd%22%3A%7B%225%22%3A123123%7D%2C%22mpid%22%3A%228179891178059554209%22%2C%22cp%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%2C%7B%22Name%22%3A%22Android%22%2C%22Sku%22%3A%22SKU2%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%2C%22pb%22%3A%7B%22pbtest%22%3A%5B%7B%22Name%22%3A%22HTC%22%2C%22Sku%22%3A%22SKU3%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%7D%7D%2C%22currentUserMPID%22%3A%224573473690267104222%22%2C%224573473690267104222%22%3A%7B%22ua%22%3A%7B%22ua1%22%3A%22value2%22%7D%2C%22ui%22%3A%7B%22email%22%3A%22test2%40email.com%22%2C%22customerid%22%3A%22customerid2%22%7D%2C%22csd%22%3A%7B%225%22%3A123123%7D%2C%22mpid%22%3A%224573473690267104222%22%2C%22cp%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%2C%7B%22Name%22%3A%22Android%22%2C%22Sku%22%3A%22SKU2%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%2C%22pb%22%3A%7B%22pbtest%22%3A%5B%7B%22Name%22%3A%22HTC%22%2C%22Sku%22%3A%22SKU3%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%7D%7D%7D';

    var SDKv1CookieV3FullLSApostrophes = "{'cp':[{'Name':'iPhone'|'Sku':'SKU1'|'Price':1|'Quantity':1|'TotalAmount':1|'Attributes':null}|{'Name':'Android'|'Sku':'SKU2'|'Price':1|'Quantity':1|'TotalAmount':1|'Attributes':null}]|'pb':{'pb1':[{'Name':'HTC'|'Sku':'SKU3'|'Price':1|'Quantity':1|'TotalAmount':1|'Attributes':null}|{'Name':'Windows'|'Sku':'SKU4'|'Price':1|'Quantity':1|'TotalAmount':1|'Attributes':null}]}|'sid':'ed937016-a06f-4275-9af4-c1830cfe951f'|'ie':1|'sa':'eyJzYTEiOiJ2YWx1ZTEifQ=='|'ua':'eyJ1YTEiOiJ2YWx1ZTEifQ=='|'ui':'eyIxIjoiY3VzdG9tZXJpZDEiLCI3IjoidGVzdEBlbWFpbC5jb20ifQ=='|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjctMTEtMDZUMTg6MTE6NDMuMjU2MDY2WiIsIlZhbHVlIjoiZz02ODFlNDMyNC0yYmFjLTQwMzYtODNkOC02MTNlZDRlYzNkY2MmdT02MjI3NDUxOTA2MTg2MDU1MDUmY3I9NDEzMTAxMSJ9fQ=='|'dt':'" + apiKey + "'|'les':" + les + "|'av':'1.5.0'|'cgid':'20f258e9-13cb-4751-ac7a-b2c66ef18db4'|'das':'681e4324-2bac-4036-83d8-613ed4ec3dcc'|'csd':'eyIxMSI6MTUxMDE2NDcwMzI0N30='|'mpid':'" + testMPID + "'}";

    // var SDKv1CookieV3NoProdLSApostrophes = "{'sid':'ed937016-a06f-4275-9af4-c1830cfe951f'|'ie':1|'sa':'eyJzYTEiOiJ2YWx1ZTEifQ=='|'ua':'eyJ1YTEiOiJ2YWx1ZTEifQ=='|'ui':'eyIxIjoiY3VzdG9tZXJpZDEiLCI3IjoidGVzdEBlbWFpbC5jb20ifQ=='|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjctMTEtMDZUMTg6MTE6NDMuMjU2MDY2WiIsIlZhbHVlIjoiZz02ODFlNDMyNC0yYmFjLTQwMzYtODNkOC02MTNlZDRlYzNkY2MmdT02MjI3NDUxOTA2MTg2MDU1MDUmY3I9NDEzMTAxMSJ9fQ=='|'dt':'" + apiKey + "'|'les':" + les + "|'av':'1.5.0'|'cgid':'20f258e9-13cb-4751-ac7a-b2c66ef18db4'|'das':'681e4324-2bac-4036-83d8-613ed4ec3dcc'|'csd':'eyIxMSI6MTUxMDE2NDcwMzI0N30='|'mpid':'" + testMPID + "'}";

    var SDKv1CookieV3WithEncodedProducts = "{'cp':'W3siTmFtZSI6IidhcG9zdHJvcGhlcyBpbicnJyBuYW1lIiwiU2t1IjoiU0tVMSIsIlByaWNlIjoxMjMsIlF1YW50aXR5IjoxLCJUb3RhbEFtb3VudCI6MTIzLCJBdHRyaWJ1dGVzIjpudWxsfV0'|'sid':'d3b6bb27-838f-49a0-bbba-407da48ac366'|'ie':1|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjgtMDEtMDFUMTU6MTk6NDAuNTM5NTYxWiIsIlZhbHVlIjoiZz1kNmM5YzY5Zi1kYjAxLTQ4YWQtYjk0OS1hZTYxNzk5ZWE1OWEmdT0tNDE4MzA5MTg5MDM3OTM2ODIxNCZjcj00MjExNDc5In19'|'dt':'" + apiKey + "'|'les':" + les + " |'ssd':1514992777026|'cgid':'2efa7a16-971d-400e-9849-704559fd8891'|'das':'d6c9c69f-db01-48ad-b949-ae61799ea59a'|'mpid': '" + testMPID + "'}";

    var SDKv1CookieV1Parsed = JSON.parse(decodeURIComponent(SDKv1CookieV1));
    var SDKv1CookieV2Parsed = JSON.parse(decodeURIComponent(SDKv1CookieV2));
    var SDKv1CookieV3Parsed = JSON.parse(mP.replacePipesWithCommas(SDKv1CookieV3));
    var SDKv1CookieV3FullParsed = JSON.parse(mP.replacePipesWithCommas(SDKv1CookieV3Full));
    // var SDKv1CookieV3LSProdOnlyParsed = JSON.parse(mP.replacePipesWithCommas(SDKv1CookieV3LSProdOnly));
    var SDKv2CookieV1Parsed = JSON.parse(decodeURIComponent(SDKv2CookieV1));

    var SDKv1CookieV3FullLSApostrophesParsed = JSON.parse(mP.replacePipesWithCommas(mP.replaceApostrophesWithQuotes(SDKv1CookieV3FullLSApostrophes)));
    // var SDKv1CookieV3NoProdLSApostrophesParsed = JSON.parse(mP.replacePipesWithCommas(mP.replaceApostrophesWithQuotes(SDKv1CookieV3NoProdLSApostrophes)));
    var SDKv1CookieV3WithEncodedProductsParsed = JSON.parse(mP.replacePipesWithCommas(mP.replaceApostrophesWithQuotes(SDKv1CookieV3WithEncodedProducts)));

    it('unit test - convertSDKv1CookiesV1ToSDKv2CookiesV4', function(done) {
        mParticle.reset();

        var v4Cookies = JSON.parse(mParticle.migrations.convertSDKv1CookiesV1ToSDKv2CookiesV4(SDKv1CookieV1));

        v4Cookies.should.have.properties('gs', SDKv1CookieV1Parsed.mpid, 'cu');
        v4Cookies.cu.should.equal(SDKv1CookieV1Parsed.mpid);
        v4Cookies.gs.should.have.properties('csm', 'sid', 'ie', 'sa', 'ss', 'dt', 'les', 'av', 'cgid', 'das');
        v4Cookies.gs.sid.should.equal(SDKv1CookieV1Parsed.sid);
        v4Cookies.gs.ie.should.equal(SDKv1CookieV1Parsed.ie);
        v4Cookies.gs.sa.sa1.should.equal(SDKv1CookieV1Parsed.sa.sa1);
        v4Cookies.gs.ss.uid.Expires.should.equal(SDKv1CookieV1Parsed.ss.uid.Expires);
        v4Cookies.gs.ss.uid.Value.should.equal(SDKv1CookieV1Parsed.ss.uid.Value);
        v4Cookies.gs.dt.should.equal(SDKv1CookieV1Parsed.dt);
        v4Cookies.gs.les.should.equal(SDKv1CookieV1Parsed.les);
        v4Cookies.gs.av.should.equal(SDKv1CookieV1Parsed.av);
        v4Cookies.gs.cgid.should.equal(SDKv1CookieV1Parsed.cgid);
        v4Cookies.gs.das.should.equal(SDKv1CookieV1Parsed.das);
        JSON.stringify(v4Cookies.gs.csm).should.equal(JSON.stringify([SDKv1CookieV1Parsed.mpid]));
        v4Cookies[SDKv1CookieV1Parsed.mpid].should.have.properties('ua', 'ui', 'csd');
        v4Cookies[SDKv1CookieV1Parsed.mpid].should.not.have.property('mpid');
        v4Cookies[SDKv1CookieV1Parsed.mpid].should.not.have.property('cp');
        v4Cookies[SDKv1CookieV1Parsed.mpid].should.not.have.property('pb');
        v4Cookies[SDKv1CookieV1Parsed.mpid].ua.attr1.should.equal(SDKv1CookieV1Parsed.ua.attr1);
        v4Cookies[SDKv1CookieV1Parsed.mpid].ua.attr1.should.equal('value1');
        v4Cookies[SDKv1CookieV1Parsed.mpid].ui.should.have.property('7', SDKv1CookieV1Parsed.ui[0].Identity);
        v4Cookies[SDKv1CookieV1Parsed.mpid].ui.should.have.property('1', SDKv1CookieV1Parsed.ui[1].Identity);
        v4Cookies[SDKv1CookieV1Parsed.mpid].csd['11'].should.equal(SDKv1CookieV1Parsed.csd['11']);

        var localStorageProducts = getLocalStorageProducts();
        JSON.stringify(localStorageProducts[SDKv1CookieV1Parsed.mpid].cp).should.equal(JSON.stringify(SDKv1CookieV1Parsed.cp));

        done();
    });

    it('integration test - should migrate from SDKv1CookieV1 to SDKv2CookieV4 and function properly when using cookie storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = true;
        setCookie(v1CookieKey, SDKv1CookieV1, true);

        mParticle.init(apiKey);
        server.requests = [];
        mParticle.eCommerce.logCheckout(1);
        var event = getEvent('eCommerce - Checkout');

        event.ua.should.have.property('attr1', SDKv1CookieV1Parsed.ua.attr1);
        event.ui[0].should.have.property('Identity', 'customerid1');
        event.ui[0].should.have.property('Type', 1);
        event.ui[1].should.have.property('Identity', 'test@email.com');
        event.ui[1].should.have.property('Type', 7);
        event.cgid.should.equal(SDKv1CookieV1Parsed.cgid);
        event.av.should.equal(SDKv1CookieV1Parsed.av);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('integration test - should migrate from SDKv1CookieV1 to SDKv2CookieV4 and function properly when using local storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;

        setLocalStorage(v1localStorageKey, SDKv1CookieV1, true);

        mParticle.init(apiKey);
        server.requests = [];
        mParticle.eCommerce.logCheckout(1);
        var event = getEvent('eCommerce - Checkout');

        event.ua.should.have.property('attr1', SDKv1CookieV1Parsed.ua.attr1);
        event.ui[0].should.have.property('Identity', 'customerid1');
        event.ui[0].should.have.property('Type', 1);
        event.ui[1].should.have.property('Identity', 'test@email.com');
        event.ui[1].should.have.property('Type', 7);

        event.cgid.should.equal(SDKv1CookieV1Parsed.cgid);
        event.av.should.equal(SDKv1CookieV1Parsed.av);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('unit test - convertSDKv1CookiesV2ToSDKv2CookiesV4', function(done) {
        mParticle.reset();
        var v4Cookies = JSON.parse(mParticle.migrations.convertSDKv1CookiesV2ToSDKv2CookiesV4(SDKv1CookieV2));
        var productsRawCookie = '%7B%22cp%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%2C%7B%22Name%22%3A%22Android%22%2C%22Sku%22%3A%22SKU2%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%2C%22pb%22%3A%7B%22pb1%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%7D%7D';
        localStorage.setItem('mprtcl-api', productsRawCookie);
        v4Cookies.should.have.properties('gs', SDKv1CookieV2Parsed.mpid, 'cu');
        v4Cookies.cu.should.equal(SDKv1CookieV2Parsed.mpid);

        v4Cookies.gs.should.have.properties('csm', 'sid', 'ie', 'ss', 'dt', 'les', 'cgid', 'das');
        v4Cookies.gs.sid.should.equal(SDKv1CookieV2Parsed.sid);
        v4Cookies.gs.ie.should.equal(SDKv1CookieV2Parsed.ie);
        v4Cookies.gs.ss.uid.Expires.should.equal(SDKv1CookieV2Parsed.ss.uid.Expires);
        v4Cookies.gs.ss.uid.Value.should.equal(SDKv1CookieV2Parsed.ss.uid.Value);
        v4Cookies.gs.dt.should.equal(SDKv1CookieV2Parsed.dt);
        v4Cookies.gs.les.should.equal(SDKv1CookieV2Parsed.les);
        v4Cookies.gs.cgid.should.equal(SDKv1CookieV2Parsed.cgid);
        v4Cookies.gs.das.should.equal(SDKv1CookieV2Parsed.das);
        JSON.stringify(v4Cookies.gs.csm).should.equal(JSON.stringify([SDKv1CookieV2Parsed.mpid]));

        v4Cookies[SDKv1CookieV2Parsed.mpid].should.have.properties('ua', 'ui', 'csd');
        v4Cookies[SDKv1CookieV2Parsed.mpid].should.not.have.property('mpid');
        v4Cookies[SDKv1CookieV2Parsed.mpid].should.not.have.property('cp');
        v4Cookies[SDKv1CookieV2Parsed.mpid].should.not.have.property('pb');
        v4Cookies[SDKv1CookieV2Parsed.mpid].ua.attr1.should.equal(SDKv1CookieV2Parsed.ua.attr1);
        v4Cookies[SDKv1CookieV2Parsed.mpid].ua.attr1.should.equal('value1');
        v4Cookies[SDKv1CookieV2Parsed.mpid].ui.should.have.property('7', SDKv1CookieV2Parsed.ui[1].Identity);
        v4Cookies[SDKv1CookieV2Parsed.mpid].ui.should.have.property('1', SDKv1CookieV2Parsed.ui[0].Identity);
        v4Cookies[SDKv1CookieV2Parsed.mpid].csd['11'].should.equal(SDKv1CookieV2Parsed.csd['11']);

        done();
    });

    it('integration test - should migrate from SDKv1CookieV2 to SDKv2CookieV4 and function properly when using cookies', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = true;
        setCookie(v2CookieKey, SDKv1CookieV2, true);
        var productsRawCookie = '%7B%22cp%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%2C%7B%22Name%22%3A%22Android%22%2C%22Sku%22%3A%22SKU2%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%2C%22pb%22%3A%7B%22pb1%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%7D%7D';
        localStorage.setItem('mprtcl-api', productsRawCookie);

        mParticle.init(apiKey);
        server.requests = [];
        mParticle.eCommerce.logCheckout(1);
        var event = getEvent('eCommerce - Checkout');

        event.ua.should.have.property('attr1', SDKv1CookieV2Parsed.ua.attr1);
        event.ui[0].should.have.property('Identity', 'customerid1');
        event.ui[0].should.have.property('Type', 1);
        event.ui[1].should.have.property('Identity', 'test@email.com');
        event.ui[1].should.have.property('Type', 7);

        event.cgid.should.equal(SDKv1CookieV2Parsed.cgid);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('integration test - should migrate from SDKv1CookieV2 to SDKv2CookieV4 and function properly when using local storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;
        setCookie(v2CookieKey, SDKv1CookieV2, true);
        var productsRawCookie = '%7B%22cp%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%2C%7B%22Name%22%3A%22Android%22%2C%22Sku%22%3A%22SKU2%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%2C%22pb%22%3A%7B%22pb1%22%3A%5B%7B%22Name%22%3A%22iPhone%22%2C%22Sku%22%3A%22SKU1%22%2C%22Price%22%3A1%2C%22Quantity%22%3A1%2C%22TotalAmount%22%3A1%7D%5D%7D%7D';
        localStorage.setItem('mprtcl-api', productsRawCookie);

        mParticle.init(apiKey);
        server.requests = [];
        mParticle.eCommerce.logCheckout(1);
        var event = getEvent('eCommerce - Checkout');

        event.ua.should.have.property('attr1', SDKv1CookieV2Parsed.ua.attr1);
        event.ui[0].should.have.property('Identity', 'customerid1');
        event.ui[0].should.have.property('Type', 1);
        event.ui[1].should.have.property('Identity', 'test@email.com');
        event.ui[1].should.have.property('Type', 7);

        event.cgid.should.equal(SDKv1CookieV2Parsed.cgid);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('unit test - should migrate from SDKv1CookieV3 to SDKv2CookieV4 using convertSDKv1CookiesV3ToSDKv2CookiesV4', function(done) {
        mParticle.reset();
        var v4Cookies = JSON.parse(mParticle.migrations.convertSDKv1CookiesV3ToSDKv2CookiesV4(SDKv1CookieV3));

        v4Cookies.should.have.properties('gs', SDKv1CookieV3Parsed.mpid, 'cu');
        v4Cookies.cu.should.equal(SDKv1CookieV3Parsed.mpid);
        v4Cookies.gs.should.have.properties('csm', 'sid', 'ie', 'sa', 'ss', 'dt', 'les', 'av', 'cgid', 'das');
        v4Cookies.gs.sid.should.equal(SDKv1CookieV3Parsed.sid);
        v4Cookies.gs.ie.should.equal(SDKv1CookieV3Parsed.ie);

        atob(v4Cookies.gs.sa).should.equal(atob(SDKv1CookieV3Parsed.sa));
        atob(v4Cookies.gs.ss).should.equal(atob(SDKv1CookieV3Parsed.ss));
        v4Cookies.gs.dt.should.equal(SDKv1CookieV3Parsed.dt);
        v4Cookies.gs.les.should.equal(SDKv1CookieV3Parsed.les);
        v4Cookies.gs.av.should.equal(SDKv1CookieV3Parsed.av);
        v4Cookies.gs.cgid.should.equal(SDKv1CookieV3Parsed.cgid);
        v4Cookies.gs.das.should.equal(SDKv1CookieV3Parsed.das);
        atob(v4Cookies.gs.csm).should.equal(JSON.stringify([SDKv1CookieV3Parsed.mpid]));
        v4Cookies[SDKv1CookieV3Parsed.mpid].should.have.properties('ua', 'ui', 'csd');
        v4Cookies[SDKv1CookieV3Parsed.mpid].should.not.have.property('mpid');
        v4Cookies[SDKv1CookieV3Parsed.mpid].should.not.have.property('cp');
        v4Cookies[SDKv1CookieV3Parsed.mpid].should.not.have.property('pb');
        atob(v4Cookies[SDKv1CookieV3Parsed.mpid].ua).should.equal(atob(SDKv1CookieV3Parsed.ua));
        atob(v4Cookies[SDKv1CookieV3Parsed.mpid].ui).should.equal(atob(SDKv1CookieV3Parsed.ui));
        v4Cookies[SDKv1CookieV3Parsed.mpid].csd['11'].should.equal(SDKv1CookieV3Parsed.csd['11']);

        done();
    });

    it('integration test - should migrate from SDKv1CookieV3 to SDKv2CookieV4 and function properly when using cookie storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = true;

        var lsProductsRaw = '{"cp":[{"Name":"iPhone"|"Sku":"SKU1"|"Price":1|"Quantity":1|"TotalAmount":1|"Attributes":null}|{"Name":"Android"|"Sku":"SKU2"|"Price":1|"Quantity":1|"TotalAmount":1|"Attributes":null}]}';
        setCookie(v3CookieKey, SDKv1CookieV3, true);
        localStorage.setItem(v3LSKey, lsProductsRaw);
        mParticle.init(apiKey);

        server.requests = [];
        mParticle.eCommerce.logCheckout(1);

        var event = getEvent('eCommerce - Checkout');
        event.ua.should.have.property('attr1', JSON.parse(atob(SDKv1CookieV3Parsed.ua)).attr1);
        event.ui[0].should.have.property('Identity', 'customerid1');
        event.ui[0].should.have.property('Type', 1);
        event.ui[1].should.have.property('Identity', 'test@email.com');
        event.ui[1].should.have.property('Type', 7);

        event.cgid.should.equal(SDKv1CookieV3Parsed.cgid);
        event.av.should.equal(SDKv1CookieV3Parsed.av);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('integration test - should migrate from SDKv1CookieV3 to SDKv2CookieV4 and function properly when using localStorage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;

        setLocalStorage(v3LSKey, SDKv1CookieV3Full, true);

        mParticle.init(apiKey);
        server.requests = [];
        mParticle.eCommerce.logCheckout(1);

        var event = getEvent('eCommerce - Checkout');
        event.ua.should.have.property('ua1', JSON.parse(atob(SDKv1CookieV3FullParsed.ua)).ua1);
        event.ui[0].should.have.property('Identity', 'test@email.com');
        event.ui[0].should.have.property('Type', 7);

        event.cgid.should.equal(SDKv1CookieV3FullParsed.cgid);
        event.av.should.equal(SDKv1CookieV3FullParsed.av);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('unit test - should migrate from SDKv1CookieV3 with apostrophes to SDKv2CookieV4 using convertSDKv1CookiesV3ToSDKv2CookiesV4', function(done) {
        mParticle.reset();

        var v4Cookies = JSON.parse(mParticle.migrations.convertSDKv1CookiesV3ToSDKv2CookiesV4(SDKv1CookieV3FullLSApostrophes));

        v4Cookies.should.have.properties('gs', SDKv1CookieV3FullLSApostrophesParsed.mpid, 'cu');
        v4Cookies.cu.should.equal(SDKv1CookieV3FullLSApostrophesParsed.mpid);
        v4Cookies.gs.should.have.properties('csm', 'sid', 'ie', 'sa', 'ss', 'dt', 'les', 'av', 'cgid', 'das');
        v4Cookies.gs.sid.should.equal(SDKv1CookieV3FullLSApostrophesParsed.sid);
        v4Cookies.gs.ie.should.equal(SDKv1CookieV3FullLSApostrophesParsed.ie);

        atob(v4Cookies.gs.sa).should.equal(atob(SDKv1CookieV3FullLSApostrophesParsed.sa));
        atob(v4Cookies.gs.ss).should.equal(atob(SDKv1CookieV3FullLSApostrophesParsed.ss));
        v4Cookies.gs.dt.should.equal(SDKv1CookieV3FullLSApostrophesParsed.dt);
        v4Cookies.gs.les.should.equal(SDKv1CookieV3FullLSApostrophesParsed.les);
        v4Cookies.gs.av.should.equal(SDKv1CookieV3FullLSApostrophesParsed.av);
        v4Cookies.gs.cgid.should.equal(SDKv1CookieV3FullLSApostrophesParsed.cgid);
        v4Cookies.gs.das.should.equal(SDKv1CookieV3FullLSApostrophesParsed.das);
        atob(v4Cookies.gs.csm).should.equal(JSON.stringify([SDKv1CookieV3FullLSApostrophesParsed.mpid]));
        v4Cookies[SDKv1CookieV3FullLSApostrophesParsed.mpid].should.have.properties('ua', 'ui', 'csd');
        v4Cookies[SDKv1CookieV3FullLSApostrophesParsed.mpid].should.not.have.property('mpid');
        v4Cookies[SDKv1CookieV3FullLSApostrophesParsed.mpid].should.not.have.property('cp');
        v4Cookies[SDKv1CookieV3FullLSApostrophesParsed.mpid].should.not.have.property('pb');
        atob(v4Cookies[SDKv1CookieV3FullLSApostrophesParsed.mpid].ua).should.equal(atob(SDKv1CookieV3FullLSApostrophesParsed.ua));
        atob(v4Cookies[SDKv1CookieV3FullLSApostrophesParsed.mpid].ui).should.equal(atob(SDKv1CookieV3FullLSApostrophesParsed.ui));
        v4Cookies[SDKv1CookieV3FullLSApostrophesParsed.mpid].csd['11'].should.equal(SDKv1CookieV3FullLSApostrophesParsed.csd['11']);

        done();
    });

    it('integration test - should migrate from SDKv1CookieV3 with apostrophes to SDKv2CookieV4 and function properly when using cookie storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = true;

        setCookie(v3CookieKey, SDKv1CookieV3FullLSApostrophes, true);

        mParticle.init(apiKey);

        server.requests = [];
        mParticle.eCommerce.logCheckout(1);

        var event = getEvent('eCommerce - Checkout');
        event.ua.should.have.property('ua1', JSON.parse(atob(SDKv1CookieV3FullLSApostrophesParsed.ua)).ua1);
        event.ui[0].should.have.property('Identity', 'customerid1');
        event.ui[0].should.have.property('Type', 1);
        event.ui[1].should.have.property('Identity', 'test@email.com');
        event.ui[1].should.have.property('Type', 7);
        event.cgid.should.equal(SDKv1CookieV3FullLSApostrophesParsed.cgid);
        event.av.should.equal(SDKv1CookieV3FullLSApostrophesParsed.av);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('integration test - should migrate from SDKv1CookieV3 with apostrophes to SDKv2CookieV4 and function properly when using local storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;

        setLocalStorage(v3LSKey, SDKv1CookieV3FullLSApostrophes, true);
        mParticle.init(apiKey);

        server.requests = [];
        mParticle.eCommerce.logCheckout(1);

        var event = getEvent('eCommerce - Checkout');
        event.ua.should.have.property('ua1', JSON.parse(atob(SDKv1CookieV3FullLSApostrophesParsed.ua)).ua1);
        event.ui[0].should.have.property('Identity', 'customerid1');
        event.ui[0].should.have.property('Type', 1);
        event.ui[1].should.have.property('Identity', 'test@email.com');
        event.ui[1].should.have.property('Type', 7);
        event.cgid.should.equal(SDKv1CookieV3FullLSApostrophesParsed.cgid);
        event.av.should.equal(SDKv1CookieV3FullLSApostrophesParsed.av);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('unit test - should migrate from SDKv2CookieV1 to SDKv2CookieV4 decoded', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = true;

        var v4Cookies = JSON.parse(mParticle.migrations.convertSDKv2CookiesV1ToSDKv2DecodedCookiesV4(decodeURIComponent(SDKv2CookieV1)));
        v4Cookies.should.have.properties('8179891178059554209', '4573473690267104222', 'gs', 'cu');

        v4Cookies.cu.should.equal(SDKv2CookieV1Parsed.currentUserMPID);

        v4Cookies.gs.should.have.properties('csm', 'sid', 'ie', 'sa', 'ss', 'dt', 'les', 'av', 'cgid', 'das', 'c');
        v4Cookies.gs.csm[0].should.equal(SDKv2CookieV1Parsed.globalSettings.currentSessionMPIDs[0]);
        v4Cookies.gs.csm[1].should.equal(SDKv2CookieV1Parsed.globalSettings.currentSessionMPIDs[1]);
        v4Cookies.gs.sid.should.equal(SDKv2CookieV1Parsed.globalSettings.sid);
        v4Cookies.gs.ie.should.equal(SDKv2CookieV1Parsed.globalSettings.ie);
        v4Cookies.gs.dt.should.equal(SDKv2CookieV1Parsed.globalSettings.dt);
        v4Cookies.gs.les.should.equal(SDKv2CookieV1Parsed.globalSettings.les);
        v4Cookies.gs.cgid.should.equal(SDKv2CookieV1Parsed.globalSettings.cgid);
        v4Cookies.gs.das.should.equal(SDKv2CookieV1Parsed.globalSettings.das);
        v4Cookies.gs.c.should.equal(SDKv2CookieV1Parsed.globalSettings.c);
        v4Cookies.gs.sa.sa1.should.equal(SDKv2CookieV1Parsed.globalSettings.sa.sa1);
        v4Cookies['8179891178059554209'].ua.ua1.should.equal(SDKv2CookieV1Parsed['8179891178059554209'].ua.ua1);
        v4Cookies['8179891178059554209'].ui[1].should.equal(SDKv2CookieV1Parsed['8179891178059554209'].ui.customerid);
        v4Cookies['8179891178059554209'].ui[7].should.equal(SDKv2CookieV1Parsed['8179891178059554209'].ui.email);
        v4Cookies['8179891178059554209'].csd['5'].should.equal(SDKv2CookieV1Parsed['8179891178059554209'].csd['5']);
        v4Cookies['8179891178059554209'].should.not.have.property('mpid');
        v4Cookies['8179891178059554209'].should.not.have.property('pb');
        v4Cookies['8179891178059554209'].should.not.have.property('cp');

        v4Cookies['4573473690267104222'].ua.ua1.should.equal(SDKv2CookieV1Parsed['4573473690267104222'].ua.ua1);
        v4Cookies['4573473690267104222'].ui[1].should.equal(SDKv2CookieV1Parsed['4573473690267104222'].ui.customerid);
        v4Cookies['4573473690267104222'].ui[7].should.equal(SDKv2CookieV1Parsed['4573473690267104222'].ui.email);
        v4Cookies['4573473690267104222'].csd['5'].should.equal(SDKv2CookieV1Parsed['4573473690267104222'].csd['5']);
        v4Cookies['4573473690267104222'].should.not.have.property('mpid');
        v4Cookies['4573473690267104222'].should.not.have.property('pb');
        v4Cookies['4573473690267104222'].should.not.have.property('cp');

        var localStorageProducts = getLocalStorageProducts();
        JSON.stringify(localStorageProducts['8179891178059554209'].cp).should.equal(JSON.stringify(SDKv2CookieV1Parsed['8179891178059554209'].cp));
        JSON.stringify(localStorageProducts['4573473690267104222'].cp).should.equal(JSON.stringify(SDKv2CookieV1Parsed['4573473690267104222'].cp));

        done();
    });

    it('integration test - should migrate from SDKv2CookieV1 to SDKv2CookieV4 and function properly when using cookie storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = true;

        setCookie(v1CookieKey, SDKv2CookieV1, true);
        server.handle = function(request) {
            request.setResponseHeader('Content-Type', 'application/json');
            request.receive(200, JSON.stringify({
                Store: {},
                mpid: '4573473690267104222'
            }));
        };

        mParticle.init(apiKey);

        server.requests = [];

        mParticle.eCommerce.logCheckout(1);

        var event = getEvent('eCommerce - Checkout');

        event.ua.should.have.property('ua1', SDKv2CookieV1Parsed[SDKv2CookieV1Parsed.currentUserMPID].ua.ua1);
        event.ui[0].should.have.property('Identity', 'customerid2');
        event.ui[0].should.have.property('Type', 1);
        event.ui[1].should.have.property('Identity', 'test2@email.com');
        event.ui[1].should.have.property('Type', 7);

        event.cgid.should.equal(SDKv2CookieV1Parsed.globalSettings.cgid);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('integration test - should migrate from SDKv2CookieV1 to SDKv2CookieV4 and function properly when using localStorage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;

        setLocalStorage(v1localStorageKey, SDKv2CookieV1, true);

        server.handle = function(request) {
            request.setResponseHeader('Content-Type', 'application/json');
            request.receive(200, JSON.stringify({
                Store: {},
                mpid: '4573473690267104222'
            }));
        };

        mParticle.init(apiKey);
        server.requests = [];
        mParticle.eCommerce.logCheckout(1);

        var event = getEvent('eCommerce - Checkout');

        event.ua.should.have.property('ua1', SDKv2CookieV1Parsed[SDKv2CookieV1Parsed.currentUserMPID].ua.ua1);
        event.ui[0].should.have.property('Identity', 'customerid2');
        event.ui[0].should.have.property('Type', 1);
        event.ui[1].should.have.property('Identity', 'test2@email.com');
        event.ui[1].should.have.property('Type', 7);

        event.cgid.should.equal(SDKv2CookieV1Parsed.globalSettings.cgid);
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', 'iPhone');
        event.sc.pl[0].should.have.property('pr', 1);
        event.sc.pl[1].should.have.property('id', 'SKU2');
        event.sc.pl[1].should.have.property('nm', 'Android');
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('unit test - should migrate products from SDKv1CookieV3 to SDKv2CookieV4 local storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;

        var product1 = mParticle.eCommerce.createProduct('iPhone', 'SKU1', 1),
            product2 = mParticle.eCommerce.createProduct('Android', 'SKU2', 1);

        var SDKv1CookieV3 = {
            sid:    '77b95bfb-4749-4678-8bff-6ee959e2904d',
            ie:     true,
            ss: btoa(JSON.stringify({ uid: {
                Expires:'2027-10-07T14:59:30.656542Z',
                Value:'exampleValue' }
            })),
            dt:     'beab3f4d34281d45bfcdbbd7eb21c083',
            les:    1507647418774,
            cgid:   'a5845924-b4a2-4756-a127-beafd5606305',
            das:    '36fe23d2-ee96-4d58-93b0-51c6f98fca20',
            mpid:   '-4321945503088905200',
            sa:     btoa(JSON.stringify({ key: 'value' })),
            csd:    btoa(JSON.stringify({ 5: 1507647418774 })),
            av:     '1.5.0',
            ua:     btoa(JSON.stringify({ gender: 'female' })),
            ui:     btoa(JSON.stringify([{ Identity: 'abc', Type: 1 }])),
            cp:     [product1, product2],
            pb:     {productBag1: [product1, product2]}
        };

        mParticle.migrations.convertSDKv1CookiesV3ToSDKv2CookiesV4(JSON.stringify(SDKv1CookieV3));

        var localStorageProducts = getLocalStorageProducts();

        JSON.stringify(localStorageProducts[SDKv1CookieV3.mpid].cp).should.equal(JSON.stringify(SDKv1CookieV3.cp));

        done();
    });

    it('unit test - should migrate from SDKv1CookieV3WithEncodedProducts to SDKv2CookieV4 decoded', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = true;

        var v4Cookies = JSON.parse(mParticle.migrations.convertSDKv1CookiesV3ToSDKv2CookiesV4(decodeURIComponent(SDKv1CookieV3WithEncodedProducts)));
        v4Cookies.should.have.properties(testMPID, 'gs', 'cu');

        v4Cookies.cu.should.equal(SDKv1CookieV3WithEncodedProductsParsed.mpid);

        v4Cookies.gs.should.have.properties('csm', 'sid', 'ie', 'ss', 'dt', 'les', 'cgid', 'das');
        atob(v4Cookies.gs.csm).should.equal(JSON.stringify([SDKv1CookieV3WithEncodedProductsParsed.mpid]));
        v4Cookies.gs.sid.should.equal(SDKv1CookieV3WithEncodedProductsParsed.sid);
        v4Cookies.gs.ie.should.equal(SDKv1CookieV3WithEncodedProductsParsed.ie);
        v4Cookies.gs.dt.should.equal(SDKv1CookieV3WithEncodedProductsParsed.dt);
        v4Cookies.gs.les.should.equal(SDKv1CookieV3WithEncodedProductsParsed.les);
        v4Cookies.gs.cgid.should.equal(SDKv1CookieV3WithEncodedProductsParsed.cgid);
        v4Cookies.gs.das.should.equal(SDKv1CookieV3WithEncodedProductsParsed.das);

        v4Cookies[testMPID].should.not.have.property('mpid');
        v4Cookies[testMPID].should.not.have.property('pb');
        v4Cookies[testMPID].should.not.have.property('cp');

        var localStorageProducts = getLocalStorageProducts();

        JSON.stringify(localStorageProducts[testMPID].cp).should.equal(atob(SDKv1CookieV3WithEncodedProductsParsed.cp));

        done();
    });

    it('integration test - should migrate from SDKv1CookieV3WithEncodedProducts to SDKv2CookieV4 and function properly when using cookie storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = true;

        setCookie(v3CookieKey, SDKv1CookieV3WithEncodedProducts, true);

        mParticle.init(apiKey);
        server.requests = [];
        var testName = "' ' test name ' with apostrophes";
        mParticle.eCommerce.Cart.add(mParticle.eCommerce.createProduct(testName, 'sku123', 1));
        mParticle.eCommerce.logCheckout(1);

        var event = getEvent('eCommerce - Checkout');

        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', '\'apostrophes in\'\'\' name');
        event.sc.pl[0].should.have.property('pr', 123);
        event.sc.pl[1].should.have.property('id', 'sku123');
        event.sc.pl[1].should.have.property('nm', testName);
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('integration test - should remove local storage products when in a broken state', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;
        var corruptLS = 'eyItODg4OTA3MDIxNTMwMzU2MDYyNyI6eyJjcCI6W3siTmFtZSI6IkRvdWJsZSBDaGVlc2VidXJnZXIiLCJTa3UiOiI4YzdiMDVjZS02NTc3LTU3ZDAtOGEyZi03M2JhN2E1MzA3N2EiLCJQcmljZSI6MTguOTksIlF1YW50aXR5IjoxLCJCcmFuZCI6IiIsIlZhcmlhbnQiOiIiLCJDYXRlZ29yeSI6IiIsIlBvc2l0aW9uIjoiIiwiQ291cG9uQ29kZSI6IiIsIlRvdGFsQW1vdW50IjoxOC45OSwiQXR0cmlidXRlcyI6eyJDYXRhbG9ndWUgTmFtZSI6IjEwMCUgQmVlZiBCdXJnZXJzICIsIkNhdGFsb2d1ZSBVVUlEIjoiNzEzZDY2OWItNzQyNy01NjRkLWE4ZTQtNDA3YjAzYmMzYWFiIiwiZGVzY3JpcHRpb24gYXZhaWxhYmxlIjp0cnVlLCJNYXJrZXQgU2hvcnQgQ29kZSI6InNhbi1mcmFuY2lzY28iLCJQbGFjZSBDYXRlZ29yeSI6ImFtZXJpY2FuIiwiUGxhY2UgTmFtZSI6IkRlbm55JTI3cyIsIlBsYWNlIFVVSUQiOiI3YWU2Y2MzNC02YzcyLTRkYzctODIzZS02MWRjNzEyMzUzMmEiLCJUb3RhbCBQcm9kdWN0IEFtb3VudCI6MTguOTl9fSx7Ik5hbWUiOiJBbGwtQW1lcmljYW4gU2xhba4iLCJTa3UiOiIxNGQyMzA0MS1mZjc4LTVhMzQtYWViYi1kNGZkMzlhZjkzNjEiLCJQcmljZSI6MTYuMjksIlF1YW50aXR5IjoxLCJCcmFuZCI6IiIsIlZhcmlhbnQiOiIiLCJDYXRlZ29yeSI6IiIsIlBvc2l0aW9uIjoiIiwiQ291cG9uQ29kZSI6IiIsIlRvdGFsQW1vdW50IjoxNi4yOSwiQXR0cmlidXRlcyI6eyJDYXRhbG9ndWUgTmFtZSI6IlNsYW1zIiwiQ2F0YWxvZ3VlIFVVSUQiOiI5NWFlMDcxNi05NTM1LTUxNjgtODFmYy02NzA5YWM5OTRkNmIiLCJkZXNjcmlwdGlvbiBhdmFpbGFibGUiOnRydWUsIk1hcmtldCBTaG9ydCBDb2RlIjoic2FuLWZyYW5jaXNjbyIsIlBsYWNlIENhdGVnb3J5IjoiYW1lcmljYW4iLCJQbGFjZSBOYW1lIjoiRGVubnklMjdzIiwiUGxhY2UgVVVJRCI6IjdhZTZjYzM0LTZjNzItNGRjNy04MjNlLTYxZGM3MTIzNTMyYSIsIlRvdGFsIFByb2R1Y3QgQW1vdW50IjoxNi4yOX19XX19';

        setLocalStorage('mprtcl-prodv4', corruptLS, true);
        var LSBefore = localStorage.getItem('mprtcl-prodv4');
        LSBefore.should.equal(corruptLS);

        mParticle.init(apiKey);

        var cartProducts = mParticle.Identity.getCurrentUser().getCart().getCartProducts();
        cartProducts.length.should.equal(0);
        var LS = localStorage.getItem(LocalStorageProductsV4WithWorkSpaceName);

        LS.should.equal('eyJ0ZXN0TVBJRCI6eyJjcCI6W119fQ==');

        done();
    });

    it('integration test - should migrate from SDKv1CookieV3WithEncodedProducts to SDKv2CookieV4 and function properly when using local storage', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;

        setLocalStorage(v3LSKey, SDKv1CookieV3WithEncodedProducts, true);
        mParticle.init(apiKey);

        server.requests = [];
        var testName = "' ' test name ' with apostrophes";
        mParticle.eCommerce.Cart.add(mParticle.eCommerce.createProduct(testName, 'sku123', 1));
        mParticle.eCommerce.logCheckout(1);

        var event = getEvent('eCommerce - Checkout');
        event.sc.pl[0].should.have.property('id', 'SKU1');
        event.sc.pl[0].should.have.property('nm', '\'apostrophes in\'\'\' name');
        event.sc.pl[0].should.have.property('pr', 123);
        event.sc.pl[1].should.have.property('id', 'sku123');
        event.sc.pl[1].should.have.property('nm', testName);
        event.sc.pl[1].should.have.property('pr', 1);

        done();
    });

    it('integration test - should add products with special characters to the cart without any errors', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;

        mParticle.init(apiKey);
        var product1 = mParticle.eCommerce.createProduct('asdfadsf’’’’', 'asdf', 123, 1);
        var product2 = mParticle.eCommerce.createProduct('asdfads®®®®', 'asdf', 123, 1);
        mParticle.eCommerce.Cart.add([product1, product2]);

        var products = mParticle.Identity.getCurrentUser().getCart().getCartProducts();
        products[0].Name.should.equal(product1.Name);
        products[1].Name.should.equal(product2.Name);

        var LS = localStorage.getItem(LocalStorageProductsV4WithWorkSpaceName);

        LS.should.equal('eyJ0ZXN0TVBJRCI6eyJjcCI6W3siTmFtZSI6ImFzZGZhZHNm4oCZ4oCZ4oCZ4oCZIiwiU2t1IjoiYXNkZiIsIlByaWNlIjoxMjMsIlF1YW50aXR5IjoxLCJUb3RhbEFtb3VudCI6MTIzLCJBdHRyaWJ1dGVzIjpudWxsfSx7Ik5hbWUiOiJhc2RmYWRzwq7CrsKuwq4iLCJTa3UiOiJhc2RmIiwiUHJpY2UiOjEyMywiUXVhbnRpdHkiOjEsIlRvdGFsQW1vdW50IjoxMjMsIkF0dHJpYnV0ZXMiOm51bGx9XX19');

        JSON.parse(atob(LS)).testMPID.cp[0].Name.should.equal('asdfadsfââââ');
        JSON.parse(atob(LS)).testMPID.cp[1].Name.should.equal('asdfadsÂ®Â®Â®Â®');

        var decoded = JSON.parse(decodeURIComponent(escape(atob(LS))));
        decoded.testMPID.cp[0].Name.should.equal(product1.Name);
        decoded.testMPID.cp[1].Name.should.equal(product2.Name);

        done();
    });

    it('integration test - should migrate from local storage with no products', function(done) {
        var les = new Date().getTime();
        mParticle.reset();

        var cookieWithoutProducts = "{'sid':'234B3BA6-7BC2-4142-9CCD-015D7C4D0597'|'ie':1|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjgtMDktMTRUMjE6MjQ6MDcuNzQ4OTU4MVoiLCJWYWx1ZSI6Imc9NGQzYzE0YmUtNDY3NC00MzY0LWJlOTAtZjBjYmI3ZGI4MTNhJnU9ODE2OTg0NjE2MjM0NjA2NDk0NiZjcj00NTgxOTI0In19'|'dt':'e207c24e36a7a8478ba0fcb3707a616b'|'les':" + les + "|'ssd':1537219447486|'cgid':'429d1e42-5883-4296-91e6-8157765914d5'|'das':'4d3c14be-4674-4364-be90-f0cbb7db813a'|'mpid':'8169846162346064946'}";
        setLocalStorage(v3LSKey, cookieWithoutProducts, true);
        mParticle.init(apiKey);

        var sessionId = mParticle.sessionManager.getSession();
        sessionId.should.equal('234B3BA6-7BC2-4142-9CCD-015D7C4D0597');

        var deviceId = mParticle.getDeviceId();
        deviceId.should.equal('4d3c14be-4674-4364-be90-f0cbb7db813a');

        done();
    });

    it('integration test - should migrate from cookies with no products', function(done) {
        var les = new Date().getTime();
        mParticle.reset();

        var cookieWithoutProducts = "{'sid':'234B3BA6-7BC2-4142-9CCD-015D7C4D0597'|'ie':1|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjgtMDktMTRUMjE6MjQ6MDcuNzQ4OTU4MVoiLCJWYWx1ZSI6Imc9NGQzYzE0YmUtNDY3NC00MzY0LWJlOTAtZjBjYmI3ZGI4MTNhJnU9ODE2OTg0NjE2MjM0NjA2NDk0NiZjcj00NTgxOTI0In19'|'dt':'e207c24e36a7a8478ba0fcb3707a616b'|'les':" + les + "|'ssd':1537219447486|'cgid':'429d1e42-5883-4296-91e6-8157765914d5'|'das':'4d3c14be-4674-4364-be90-f0cbb7db813a'|'mpid':'8169846162346064946'}";
        setCookie(v3CookieKey, cookieWithoutProducts, true);
        mParticle.init(apiKey);

        var sessionId = mParticle.sessionManager.getSession();
        sessionId.should.equal('234B3BA6-7BC2-4142-9CCD-015D7C4D0597');

        var deviceId = mParticle.getDeviceId();
        deviceId.should.equal('4d3c14be-4674-4364-be90-f0cbb7db813a');

        done();
    });

    it('integration test - migrates from local storage that have special characters in user attributes and user identities', function(done) {
        var les = new Date().getTime();

        mParticle.reset();

        var cookieWithoutProducts = "{'sid':'1992BDBB-AD74-49DB-9B20-5EC8037E72DE'|'ie':1|'ua':'eyJ0ZXN0Ijoiwq7igJkifQ=='|'ui':'eyIzIjoiwq7igJkifQ=='|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjgtMDktMTRUMjI6MjI6MTAuMjU0MDcyOVoiLCJWYWx1ZSI6Imc9NjhjMmJhMzktYzg2OS00MTZhLWE4MmMtODc4OWNhZjVmMWU3JnU9NDE3NjQyNTYyMTQ0MTEwODk2OCZjcj00NTgxOTgyIn19'|'dt':'e207c24e36a7a8478ba0fcb3707a616b'|'les':" + les + "|'ssd':1537222930186|'cgid':'4ebad5b4-8ed1-4275-8455-838a2e3aa5c0'|'das':'68c2ba39-c869-416a-a82c-8789caf5f1e7'|'mpid':'4176425621441108968'}";
        setLocalStorage(v3LSKey, cookieWithoutProducts, true);

        mParticle.init(apiKey);

        var currentUser = mParticle.Identity.getCurrentUser();
        var ua = currentUser.getAllUserAttributes();
        var ui = currentUser.getUserIdentities();

        ua.test.should.equal('®’');

        ui.userIdentities.twitter.should.equal('®’');

        done();
    });

    it('integration test - migrates from cookies that have special characters in user attributes and user identities', function(done) {
        var les = new Date().getTime();

        mParticle.reset();

        var cookieWithoutProducts = "{'sid':'1992BDBB-AD74-49DB-9B20-5EC8037E72DE'|'ie':1|'ua':'eyJ0ZXN0Ijoiwq7igJkifQ=='|'ui':'eyIzIjoiwq7igJkifQ=='|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjgtMDktMTRUMjI6MjI6MTAuMjU0MDcyOVoiLCJWYWx1ZSI6Imc9NjhjMmJhMzktYzg2OS00MTZhLWE4MmMtODc4OWNhZjVmMWU3JnU9NDE3NjQyNTYyMTQ0MTEwODk2OCZjcj00NTgxOTgyIn19'|'dt':'e207c24e36a7a8478ba0fcb3707a616b'|'les':" + les + "|'ssd':1537222930186|'cgid':'4ebad5b4-8ed1-4275-8455-838a2e3aa5c0'|'das':'68c2ba39-c869-416a-a82c-8789caf5f1e7'|'mpid':'4176425621441108968'}";
        setCookie(v3CookieKey, cookieWithoutProducts, true);

        mParticle.init(apiKey);

        var currentUser = mParticle.Identity.getCurrentUser();
        var ua = currentUser.getAllUserAttributes();
        var ui = currentUser.getUserIdentities();

        ua.test.should.equal('®’');
        // console.log(ui);
        ui.userIdentities.twitter.should.equal('®’');
        done();
    });

    it('integration test - saves user attributes with special characters ® and ’', function(done) {
        mParticle.reset();

        mParticle.init(apiKey);

        var currentUser = mParticle.Identity.getCurrentUser();
        currentUser.setUserAttribute('test', '®’');
        mParticle.init(apiKey);

        var ua = mParticle.Identity.getCurrentUser().getAllUserAttributes();

        ua.test.should.equal('®’');

        done();
    });

    it('integration test - clears and creates new LS when LS is corrupt when migrating', function(done) {
        var les = new Date().getTime();

        mParticle.reset();

        //an extra apostrophe is added to ua here to force a corrupt cookie. On init, cookies will clear and there will be a new cgid, sid, and das to exist
        var rawLS = "{'sid':'1992BDBB-AD74-49DB-9B20-5EC8037E72DE'|'ie':1|'ua':'eyJ0ZXN'0Ijoiwq7igJkifQ=='|'ui':'eyIzIjoiwq7igJkifQ=='|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjgtMDktMTRUMjI6MjI6MTAuMjU0MDcyOVoiLCJWYWx1ZSI6Imc9NjhjMmJhMzktYzg2OS00MTZhLWE4MmMtODc4OWNhZjVmMWU3JnU9NDE3NjQyNTYyMTQ0MTEwODk2OCZjcj00NTgxOTgyIn19'|'dt':'e207c24e36a7a8478ba0fcb3707a616b'|'les':" + les + "|'ssd':1537222930186|'cgid':'4ebad5b4-8ed1-4275-8455-838a2e3aa5c0'|'das':'68c2ba39-c869-416a-a82c-8789caf5f1e7'|'mpid':'4176425621441108968'}";
        setLocalStorage(v3LSKey, rawLS, true);

        mParticle.init(apiKey);

        var sessionId = mParticle.sessionManager.getSession();
        var das = mParticle.getDeviceId();
        var cgid = mParticle.persistence.getLocalStorage().gs.cgid;
        sessionId.should.not.equal('1992BDBB-AD74-49DB-9B20-5EC8037E72DE');
        das.should.not.equal('68c2ba39-c869-416a-a82c-8789caf5f1e7');
        cgid.should.not.equal('4ebad5b4-8ed1-4275-8455-838a2e3aa5c0');

        done();
    });

    it('integration test - clears and creates new cookies when cookies is corrupt when migrating', function(done) {
        var les = new Date().getTime();

        mParticle.reset();

        //an extra apostrophe is added to ua here to force a corrupt cookie. On init, cookies will clear and there will be a new cgid, sid, and das to exist
        var cookies = "{'sid':'1992BDBB-AD74-49DB-9B20-5EC8037E72DE'|'ie':1|'ua':'eyJ0ZXN'0Ijoiwq7igJkifQ=='|'ui':'eyIzIjoiwq7igJkifQ=='|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjgtMDktMTRUMjI6MjI6MTAuMjU0MDcyOVoiLCJWYWx1ZSI6Imc9NjhjMmJhMzktYzg2OS00MTZhLWE4MmMtODc4OWNhZjVmMWU3JnU9NDE3NjQyNTYyMTQ0MTEwODk2OCZjcj00NTgxOTgyIn19'|'dt':'e207c24e36a7a8478ba0fcb3707a616b'|'les':" + les + "|'ssd':1537222930186|'cgid':'4ebad5b4-8ed1-4275-8455-838a2e3aa5c0'|'das':'68c2ba39-c869-416a-a82c-8789caf5f1e7'|'mpid':'4176425621441108968'}";
        setCookie(v3CookieKey, cookies, true);

        mParticle.init(apiKey);

        var sessionId = mParticle.sessionManager.getSession();
        var das = mParticle.getDeviceId();
        var cgid = mParticle.persistence.getLocalStorage().gs.cgid;
        sessionId.should.not.equal('1992BDBB-AD74-49DB-9B20-5EC8037E72DE');
        das.should.not.equal('68c2ba39-c869-416a-a82c-8789caf5f1e7');
        cgid.should.not.equal('4ebad5b4-8ed1-4275-8455-838a2e3aa5c0');

        done();
    });

    it('integration test - clears products if when migrating they are corrupt', function(done) {
        var les = new Date().getTime();

        mParticle.reset();

        // CP of mParticle.eCommerce.createProduct('iPhone®’ 8', 'iPhoneSKU123', 699, 1, '8 Plus 64GB', 'Phones', 'Apple', null, 'CouponCode1', {discount: 5, searchTerm: 'apple'});, and mParticle.eCommerce.createProduct('Galaxy®’ S9', 'AndroidSKU123', 699, 1, 'S9 Plus 64GB', 'Phones', 'Samsung', null, 'CouponCode2', {discount: 10, searchTerm: 'samsung'});
        // corrupt CP by adding a few characters to bas64 string
        var cookies =
        "{'cp':'111W3siTmFtZSI6ImlQaG9uasdfZcKu4oCZIDgiLCJTa3UiOiJpUGhvbmVTS1UxMjMiLCJQcmljZSI6Njk5LCJRdWFudGl0eSI6MSwiQnJhbmQiOiJBcHBsZSIsIlZhcmlhbnQiOiI4IFBsdXMgNjRHQiIsIkNhdGVnb3J5IjoiUGhvbmVzIiwiUG9zaXRpb24iOm51bGwsIkNvdXBvbkNvZGUiOiJDb3Vwb25Db2RlMSIsIlRvdGFsQW1vdW50Ijo2OTksIkF0dHJpYnV0ZXMiOnsiZGlzY291bnQiOjUsInNlYXJjaFRlcm0iOiJhcHBsZSJ9fSx7Ik5hbWUiOiJHYWxheHnCruKAmSBTOSIsIlNrdSI6IkFuZHJvaWRTS1UxMjMiLCJQcmljZSI6Njk5LCJRdWFudGl0eSI6MSwiQnJhbmQiOiJTYW1zdW5nIiwiVmFyaWFudCI6IlM5IFBsdXMgNjRHQiIsIkNhdGVnb3J5IjoiUGhvbmVzIiwiUG9zaXRpb24iOm51bGwsIkNvdXBvbkNvZGUiOiJDb3Vwb25Db2RlMiIsIlRvdGFsQW1vdW50Ijo2OTksIkF0dHJpYnV0ZXMiOnsiZGlzY291bnQiOjEwLCJzZWFyY2hUZXJtIjoic2Ftc3VuZyJ9fV0='|'sid':'5FB9CD47-CCC5-4897-B901-61059E9C5A0C'|'ie':1|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjgtMDktMjNUMTg6NDQ6MjUuMDg5OTk2NVoiLCJWYWx1ZSI6Imc9YTY3ZWZmZDAtY2UyMC00Y2M4LTg5MzgtNzc3MWY0YzQ2ZmZiJnU9MjA3Mzk0MTkzMjk4OTgyMzA5OSZjcj00NTk0NzI0In19'|'dt':'e207c24e36a7a8478ba0fcb3707a616b'|'les':" + les + "|'ssd':1537987465067|'cgid':'d1ce6cb1-5f28-4520-8ce7-f67288590944'|'das':'a67effd0-ce20-4cc8-8938-7771f4c46ffb'|'mpid':'2073941932989823099'}";

        setCookie(v3CookieKey, cookies, true);
        mParticle.init(apiKey);

        Should(mParticle.Identity.getCurrentUser().getCart().getCartProducts().length).not.be.ok();

        done();
    });

    it('does not throw error during migration step when local storage does not exist', function(done) {
        mParticle.reset();
        mParticle.useCookieStorage = false;

        var cookies =
        "{'cp':'111W3siTmFtZSI6ImlQaG9uasdfZcKu4oCZIDgiLCJTa3UiOiJpUGhvbmVTS1UxMjMiLCJQcmljZSI6Njk5LCJRdWFudGl0eSI6MSwiQnJhbmQiOiJBcHBsZSIsIlZhcmlhbnQiOiI4IFBsdXMgNjRHQiIsIkNhdGVnb3J5IjoiUGhvbmVzIiwiUG9zaXRpb24iOm51bGwsIkNvdXBvbkNvZGUiOiJDb3Vwb25Db2RlMSIsIlRvdGFsQW1vdW50Ijo2OTksIkF0dHJpYnV0ZXMiOnsiZGlzY291bnQiOjUsInNlYXJjaFRlcm0iOiJhcHBsZSJ9fSx7Ik5hbWUiOiJHYWxheHnCruKAmSBTOSIsIlNrdSI6IkFuZHJvaWRTS1UxMjMiLCJQcmljZSI6Njk5LCJRdWFudGl0eSI6MSwiQnJhbmQiOiJTYW1zdW5nIiwiVmFyaWFudCI6IlM5IFBsdXMgNjRHQiIsIkNhdGVnb3J5IjoiUGhvbmVzIiwiUG9zaXRpb24iOm51bGwsIkNvdXBvbkNvZGUiOiJDb3Vwb25Db2RlMiIsIlRvdGFsQW1vdW50Ijo2OTksIkF0dHJpYnV0ZXMiOnsiZGlzY291bnQiOjEwLCJzZWFyY2hUZXJtIjoic2Ftc3VuZyJ9fV0='|'sid':'5FB9CD47-CCC5-4897-B901-61059E9C5A0C'|'ie':1|'ss':'eyJ1aWQiOnsiRXhwaXJlcyI6IjIwMjgtMDktMjNUMTg6NDQ6MjUuMDg5OTk2NVoiLCJWYWx1ZSI6Imc9YTY3ZWZmZDAtY2UyMC00Y2M4LTg5MzgtNzc3MWY0YzQ2ZmZiJnU9MjA3Mzk0MTkzMjk4OTgyMzA5OSZjcj00NTk0NzI0In19'|'dt':'e207c24e36a7a8478ba0fcb3707a616b'|'les':" + les + "|'ssd':1537987465067|'cgid':'d1ce6cb1-5f28-4520-8ce7-f67288590944'|'das':'a67effd0-ce20-4cc8-8938-7771f4c46ffb'|'mpid':'2073941932989823099'}";

        setCookie(v3CookieKey, cookies, true);

        mParticle._forceNoLocalStorage = true;

        mParticle.init(apiKey);
        (window.localStorage.getItem('mprtclv4') === null).should.equal(true);
        findCookie(v4CookieKey).cu.should.equal('2073941932989823099');
        mParticle._forceNoLocalStorage = false;

        done();
    });

    it('migrates from v4cookie to name spaced cookie', function(done) {
        mParticle.workspaceToken = 'abcdef';
        mParticle.reset();
        var date = (new Date()).getTime();
        setCookie(v4CookieKey, JSON.stringify({
            gs: {
                les: date,
                dt: apiKey,
                cgid: 'testCGID',
                das: 'testDAS',
                ssd: date
            },
            testMPID: {
                ui: btoa(JSON.stringify({1: 'customerid'})),
                ua: btoa(JSON.stringify({age: 30})),
                csd: btoa(JSON.stringify({5: date}))
            },
            cu: testMPID
        }));

        mParticle.init(apiKey);
        mParticle.workspaceToken = null;

        var oldLS = localStorage.getItem(v4CookieKey);
        Should(oldLS).not.be.ok();

        var newLS = localStorage.getItem(workspaceCookieName);
        Should(newLS).be.ok();

        var data = mParticle.persistence.getLocalStorage();
        data.gs.les.should.aboveOrEqual(date);
        data.gs.should.have.property('dt', apiKey);
        data.gs.should.have.property('cgid', 'testCGID');
        data.gs.should.have.property('das', 'testDAS');
        data.should.have.property('testMPID');
        data.testMPID.ui.should.have.property('1', 'customerid');
        data.testMPID.ua.should.have.property('age', 30);
        data.testMPID.csd.should.have.property('5', date);

        done();
    });

    it('migrates from v4cookie to name spaced localStorage', function(done) {
        mParticle.workspaceToken = 'abcdef';
        mParticle.reset();
        var date = (new Date()).getTime();
        setLocalStorage(v4CookieKey, {
            gs: {
                les: date,
                dt: apiKey,
                cgid: 'testCGID',
                das: 'testDAS',
                ssd: date
            },
            testMPID: {
                ui: btoa(JSON.stringify({1: 'customerid'})),
                ua: btoa(JSON.stringify({age: 30})),
                csd: btoa(JSON.stringify({5: date}))
            },
            cu: testMPID
        });

        mParticle.init(apiKey);
        mParticle.workspaceToken = null;

        var oldLS = localStorage.getItem(v4CookieKey);
        Should(oldLS).not.be.ok();

        var newLS = localStorage.getItem(workspaceCookieName);
        Should(newLS).be.ok();

        var data = mParticle.persistence.getLocalStorage();
        data.gs.les.should.aboveOrEqual(date);
        data.gs.should.have.property('dt', apiKey);
        data.gs.should.have.property('cgid', 'testCGID');
        data.gs.should.have.property('das', 'testDAS');
        data.should.have.property('testMPID');
        data.testMPID.ui.should.have.property('1', 'customerid');
        data.testMPID.ua.should.have.property('age', 30);
        data.testMPID.csd.should.have.property('5', date);

        done();
    });

    it('migrates from nonNameSpaced products to nameSpacedProducts on localStorage', function(done) {
        mParticle.reset();
        mParticle.init(apiKey);
        var product1 = mParticle.eCommerce.createProduct('iphone', 'iphoneSKU', 999);
        var product2 = mParticle.eCommerce.createProduct('galaxy', 'galaxySKU', 799);
        mParticle.eCommerce.Cart.add([product1, product2]);

        var oldLS = localStorage.getItem(LocalStorageProductsV4);
        Should(oldLS).not.be.ok();

        mParticle.workspaceToken = 'abcdef';
        mParticle.init(apiKey);


        var newLS = JSON.parse(atob(localStorage.getItem(LocalStorageProductsV4WithWorkSpaceName)));
        var products = newLS.testMPID.cp;
        products.should.have.length(2);
        products[0].should.have.property('Name', 'iphone');
        products[0].should.have.property('Sku', 'iphoneSKU');
        products[0].should.have.property('Price', 999);
        products[1].should.have.property('Name', 'galaxy');
        products[1].should.have.property('Sku', 'galaxySKU');
        products[1].should.have.property('Price', 799);

        done();
    });
});
