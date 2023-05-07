export default function Reflect(self: any) {
    const _set = self.Reflect.set.bind({});
    const _get = self.Reflect.get.bind({});

    self.Reflect.set = new Proxy(self.Reflect.set, {
        apply(t, g, a) {
            if (a[0].constructor.name=='Window') {
                if (a[1]=='location') {
                    a[0].__dynamic$location = a[2];
                    return true;
                }
            }

            if (a[0].constructor.name=='Location') {
                self.__dynamic$location[a[1]] = a[2];
                return true;
            }
            
            return _set.apply(this, a);
        }
    });

    self.Reflect.get = new Proxy(self.Reflect.get, {
        apply(t, g, a) {
            if (a[0].constructor.name=='Window') {
                if (a[1]=='location') return a[0].__dynamic$location;

                if (a[0][a[1]].constructor.name=='Window') {
                    return a[0][a[1]].__dynamic$window;
                }
            }

            if (a[0].constructor.name=='Location') {
                return self.__dynamic$location[a[1]];
            }

            console.log(a);

            return _get.apply(this, a);
        }
    });

    self.__dynamic.Reflect = {
        get: _get,
        set: _set,
        apply: self.Reflect.apply.bind({}),
        construct: self.Reflect.construct.bind({}),
        defineProperty: self.Reflect.defineProperty.bind({}),
        deleteProperty: self.Reflect.deleteProperty.bind({}),
        getOwnPropertyDescriptor: self.Reflect.getOwnPropertyDescriptor.bind({}),
        getPrototypeOf: self.Reflect.getPrototypeOf.bind({}),
        has: self.Reflect.has.bind({}),
        isExtensible: self.Reflect.isExtensible.bind({}),
        ownKeys: self.Reflect.ownKeys.bind({}),
        preventExtensions: self.Reflect.preventExtensions.bind({}),
        setPrototypeOf: self.Reflect.setPrototypeOf.bind({})
    }
}