"use strict";
var expect = require("chai").expect;
var jproxy = require("../dist/index.js")


class Test{
    a(){

    }

    b(i)
    {

    }

    c(j){
        return 1;
    }
}

describe("createProxy", () =>{
    it("should build equivalent proxy", () =>{
        var proxy = jproxy.createProxy(Test, () => {});

        expect(proxy.a).to.be.defined;
        expect(proxy.b).to.be.defined;
        expect(proxy.c).to.be.defined;
    })

    describe("interceptors", () =>{
        var buildIntProxy = () =>{
            var hasBeenCalled = false;
            var proxy = jproxy.createProxy(Test, () =>{
                hasBeenCalled = true
            });
            return {proxy : proxy, hasBeenCalled: hasBeenCalled}
        }

        it("should call interceptor instead of a", () =>{
            var hasBeenCalled = false;
            var proxy = jproxy.createProxy(Test, () =>{
                hasBeenCalled = true;
                return 1;
            });

            var res = proxy.a();
            expect(hasBeenCalled).to.be.true;
            expect(res).to.eql(1);
        })

        it("should call interceptor instead of b", () =>{
            var hasBeenCalled = false;
            var proxy = jproxy.createProxy(Test, () =>{
                hasBeenCalled = true;
                return 1;
            });

            var res = proxy.b();
            expect(hasBeenCalled).to.be.true;
            expect(res).to.eql(1);
        })

        it("should supply name to interceptor", () =>{
            var hasBeenCalledCorrectly = false;
            var proxy = jproxy.createProxy(Test, (method) =>{
                if(method == "c")
                hasBeenCalledCorrectly = true;
                return 2;
            });

            var res = proxy.c();
            expect(hasBeenCalledCorrectly).to.be.true;
            expect(res).to.eql(2);
        })

        it("should supply params to interceptor", () =>{
            var hasBeenCalledCorrectly = false;
            var proxy = jproxy.createProxy(Test, (method, args) =>{
                if(args[0] === 43 && args[1] === 21 && args[2] == true && args.length === 3)
                hasBeenCalledCorrectly = true;
            });

            var res = proxy.a(43, 21, true);
            expect(hasBeenCalledCorrectly).to.be.true;
        })
    })

});