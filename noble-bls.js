'use strict';

var globals = typeof global === 'undefined' ? self : global;
if (typeof globals.require === 'function') console.error('no browser!');

var modules = {};
var cache = {};
var aliases = {};
var has = {}.hasOwnProperty;

var expRe = /^\.\.?(\/|$)/;
var expand = function(root, name) {
	var results = [],
		part;
	var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
	for (var i = 0, length = parts.length; i < length; i++) {
		part = parts[i];
		if (part === '..') {
			results.pop();
		} else if (part !== '.' && part !== '') {
			results.push(part);
		}
	}
	return results.join('/');
};

var dirname = function(path) {
	return path.split('/').slice(0, -1).join('/');
};

var localRequire = function(path) {
	return function expanded(name) {
		var absolute = expand(dirname(path), name);
		return globals.require(absolute, path);
	};
};

var initModule = function(name, definition) {
	var hot = hmr && hmr.createHot(name);
	var module = {
		id: name,
		exports: {},
		hot: hot
	};
	cache[name] = module;
	definition(module.exports, localRequire(name), module);
	return module.exports;
};

var expandAlias = function(name) {
	var val = aliases[name];
	return (val && name !== val) ? expandAlias(val) : name;
};

var _resolve = function(name, dep) {
	return expandAlias(expand(dirname(name), dep));
};

var require = function(name, loaderPath) {
	if (loaderPath == null) loaderPath = '/';
	var path = expandAlias(name);

	if (has.call(cache, path)) return cache[path].exports;
	if (has.call(modules, path)) return initModule(path, modules[path]);

	throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
};

require.alias = function(from, to) {
	aliases[to] = from;
};

var extRe = /\.[^.\/]+$/;
var indexRe = /\/index(\.[^\/]+)?$/;
var addExtensions = function(bundle) {
	if (extRe.test(bundle)) {
		var alias = bundle.replace(extRe, '');
		if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
			aliases[alias] = bundle;
		}
	}

	if (indexRe.test(bundle)) {
		var iAlias = bundle.replace(indexRe, '');
		if (!has.call(aliases, iAlias)) {
			aliases[iAlias] = bundle;
		}
	}
};

require.register = require.define = function(bundle, fn) {
	if (bundle && typeof bundle === 'object') {
		for (var key in bundle) {
			if (has.call(bundle, key)) {
				require.register(key, bundle[key]);
			}
		}
	} else {
		modules[bundle] = fn;
		delete cache[bundle];
		addExtensions(bundle);
	}
};

require.list = function() {
	var list = [];
	for (var item in modules) {
		if (has.call(modules, item)) {
			list.push(item);
		}
	}
	return list;
};

var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
require._cache = cache;
require.hmr = hmr && hmr.wrap;
require.brunch = true;
globals.require = require;

// CUT

var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
	var none = {};
	var tryReq = function(name, pref) {
		var val;
		try {
			val = require(pref + '/node_modules/' + name);
			return val;
		} catch (e) {
			if (e.toString().indexOf('Cannot find module') === -1) {
				throw e;
			}

			if (pref.indexOf('node_modules') !== -1) {
				var s = pref.split('/');
				var i = s.lastIndexOf('node_modules');
				var newPref = s.slice(0, i).join('/');
				return tryReq(name, newPref);
			}
		}
		return none;
	};
	return function(name) {
		if (name in mappings) name = mappings[name];
		if (!name) return;
		if (name[0] !== '.' && pref) {
			var val = tryReq(name, pref);
			if (val !== none) return val;
		}
		return require(name);
	}
};

// CUT

const math_2 = {};

math_2.isogenyCoefficients = math_2.psi2 = math_2.psi = math_2.millerLoop = math_2.calcPairingPrecomputes = math_2.isogenyMapG2 = math_2.map_to_curve_SSWU_G2 = math_2.ProjectivePoint = math_2.Fq12 = math_2.Fq6 = math_2.Fq2 = math_2.Fr = math_2.Fq = math_2.powMod = math_2.mod = math_2.DST_LABEL = math_2.CURVE = void 0;
math_2.CURVE = {
	P: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
	r: 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n,
	h: 0x396c8c005555e1568c00aaab0000aaabn,
	Gx: 0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn,
	Gy: 0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1n,
	b: 4n,
	P2: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn **
		2n -
		1n,
	h2: 0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5n,
	G2x: [
		0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8n,
		0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7en,
	],
	G2y: [
		0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801n,
		0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79ben,
	],
	b2: [4n, 4n],
	x: 0xd201000000010000n,
	h_eff: 0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551n,
};
math_2.DST_LABEL = 'BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_';
const BLS_X_LEN = bitLen(math_2.CURVE.x);

function mod(a, b) {
	const res = a % b;
	return res >= 0n ? res : b + res;
}
math_2.mod = mod;

function powMod(a, power, modulo) {
	let res = 1n;
	while (power > 0n) {
		if (power & 1n)
			res = (res * a) % modulo;
		a = (a * a) % modulo;
		power >>= 1n;
	}
	return res;
}
math_2.powMod = powMod;

function genInvertBatch(cls, nums) {
	const len = nums.length;
	const scratch = new Array(len);
	let acc = cls.ONE;
	for (let i = 0; i < len; i++) {
		if (nums[i].isZero())
			continue;
		scratch[i] = acc;
		acc = acc.multiply(nums[i]);
	}
	acc = acc.invert();
	for (let i = len - 1; i >= 0; i--) {
		if (nums[i].isZero())
			continue;
		let tmp = acc.multiply(nums[i]);
		nums[i] = acc.multiply(scratch[i]);
		acc = tmp;
	}
	return nums;
}

function bitLen(n) {
	let len;
	for (len = 0; n > 0n; n >>= 1n, len += 1)
	;
	return len;
}

function bitGet(n, pos) {
	return (n >> BigInt(pos)) & 1n;
}

function invert(number, modulo = math_2.CURVE.P) {
	if (number === 0n || modulo <= 0n) {
		throw new Error('invert: expected positive integers');
	}
	let a = mod(number, modulo);
	let b = modulo;
	let [x, y, u, v] = [0n, 1n, 1n, 0n];
	while (a !== 0n) {
		const q = b / a;
		const r = b % a;
		const m = x - u * q;
		const n = y - v * q;
		[b, a] = [a, r];
		[x, y] = [u, v];
		[u, v] = [m, n];
	}
	const gcd = b;
	if (gcd !== 1n)
		throw new Error('invert: does not exist');
	return mod(x, modulo);
}
class Fq {
	constructor(value) {
		this.value = mod(value, Fq.ORDER);
	}
	isZero() {
		return this.value === 0n;
	}
	equals(rhs) {
		return this.value === rhs.value;
	}
	negate() {
		return new Fq(-this.value);
	}
	invert() {
		return new Fq(invert(this.value, Fq.ORDER));
	}
	add(rhs) {
		return new Fq(this.value + rhs.value);
	}
	square() {
		return new Fq(this.value * this.value);
	}
	pow(n) {
		return new Fq(powMod(this.value, n, Fq.ORDER));
	}
	subtract(rhs) {
		return new Fq(this.value - rhs.value);
	}
	multiply(rhs) {
		if (rhs instanceof Fq)
			rhs = rhs.value;
		return new Fq(this.value * rhs);
	}
	div(rhs) {
		const inv = typeof rhs === 'bigint' ? new Fq(rhs).invert().value : rhs.invert();
		return this.multiply(inv);
	}
	toString() {
		const str = this.value.toString(16).padStart(96, '0');
		return str.slice(0, 2) + '.' + str.slice(-2);
	}
}
math_2.Fq = Fq;
Fq.ORDER = math_2.CURVE.P;
Fq.MAX_BITS = bitLen(math_2.CURVE.P);
Fq.ZERO = new Fq(0n);
Fq.ONE = new Fq(1n);
class Fr {
	constructor(value) {
		this.value = mod(value, Fr.ORDER);
	}
	static isValid(b) {
		return b <= Fr.ORDER;
	}
	isZero() {
		return this.value === 0n;
	}
	equals(rhs) {
		return this.value === rhs.value;
	}
	negate() {
		return new Fr(-this.value);
	}
	invert() {
		return new Fr(invert(this.value, Fr.ORDER));
	}
	add(rhs) {
		return new Fr(this.value + rhs.value);
	}
	square() {
		return new Fr(this.value * this.value);
	}
	pow(n) {
		return new Fr(powMod(this.value, n, Fr.ORDER));
	}
	subtract(rhs) {
		return new Fr(this.value - rhs.value);
	}
	multiply(rhs) {
		if (rhs instanceof Fr)
			rhs = rhs.value;
		return new Fr(this.value * rhs);
	}
	div(rhs) {
		const inv = typeof rhs === 'bigint' ? new Fr(rhs).invert().value : rhs.invert();
		return this.multiply(inv);
	}
	legendre() {
		return this.pow((Fr.ORDER - 1n) / 2n);
	}
	sqrt() {
		if (!this.legendre().equals(Fr.ONE))
			return;
		const P = Fr.ORDER;
		let q, s, z;
		for (q = P - 1n, s = 0; q % 2n === 0n; q /= 2n, s++)
		;
		if (s === 1)
			return this.pow((P + 1n) / 4n);
		for (z = 2n; z < P && new Fr(z).legendre().value !== P - 1n; z++)
		;
		let c = powMod(z, q, P);
		let r = powMod(this.value, (q + 1n) / 2n, P);
		let t = powMod(this.value, q, P);
		let t2 = 0n;
		while (mod(t - 1n, P) !== 0n) {
			t2 = mod(t * t, P);
			let i;
			for (i = 1; i < s; i++) {
				if (mod(t2 - 1n, P) === 0n)
					break;
				t2 = mod(t2 * t2, P);
			}
			let b = powMod(c, BigInt(1 << (s - i - 1)), P);
			r = mod(r * b, P);
			c = mod(b * b, P);
			t = mod(t * c, P);
			s = i;
		}
		return new Fr(r);
	}
	toString() {
		return '0x' + this.value.toString(16).padStart(64, '0');
	}
}
math_2.Fr = Fr;
Fr.ORDER = math_2.CURVE.r;
Fr.ZERO = new Fr(0n);
Fr.ONE = new Fr(1n);
class FQP {
	zip(rhs, mapper) {
		const c0 = this.c;
		const c1 = rhs.c;
		const res = [];
		for (let i = 0; i < c0.length; i++) {
			res.push(mapper(c0[i], c1[i]));
		}
		return res;
	}
	map(callbackfn) {
		return this.c.map(callbackfn);
	}
	isZero() {
		return this.c.every((c) => c.isZero());
	}
	equals(rhs) {
		return this.zip(rhs, (left, right) => left.equals(right)).every((r) => r);
	}
	negate() {
		return this.init(this.map((c) => c.negate()));
	}
	add(rhs) {
		return this.init(this.zip(rhs, (left, right) => left.add(right)));
	}
	subtract(rhs) {
		return this.init(this.zip(rhs, (left, right) => left.subtract(right)));
	}
	conjugate() {
		return this.init([this.c[0], this.c[1].negate()]);
	}
	one() {
		const el = this;
		let one;
		if (el instanceof Fq2)
			one = Fq2.ONE;
		if (el instanceof Fq6)
			one = Fq6.ONE;
		if (el instanceof Fq12)
			one = Fq12.ONE;
		return one;
	}
	pow(n) {
		const elm = this;
		const one = this.one();
		if (n === 0n)
			return one;
		if (n === 1n)
			return elm;
		let p = one;
		let d = elm;
		while (n > 0n) {
			if (n & 1n)
				p = p.multiply(d);
			n >>= 1n;
			d = d.square();
		}
		return p;
	}
	div(rhs) {
		const inv = typeof rhs === 'bigint' ? new Fq(rhs).invert().value : rhs.invert();
		return this.multiply(inv);
	}
}
const rv1 = 0x6af0e0437ff400b6831e36d6bd17ffe48395dabc2d3435e77f76e17009241c5ee67992f72ec05f4c81084fbede3cc09n;
const ev1 = 0x699be3b8c6870965e5bf892ad5d2cc7b0e85a117402dfd83b7f4a947e02d978498255a2aaec0ac627b5afbdf1bf1c90n;
const ev2 = 0x8157cd83046453f5dd0972b6e3949e4288020b5b8a9cc99ca07e27089a2ce2436d965026adad3ef7baba37f2183e9b5n;
const ev3 = 0xab1c2ffdd6c253ca155231eb3e71ba044fd562f6f72bc5bad5ec46a0b7a3b0247cf08ce6c6317f40edbc653a72dee17n;
const ev4 = 0xaa404866706722864480885d68ad0ccac1967c7544b447873cc37e0181271e006df72162a3d3e0287bf597fbf7f8fc1n;
class Fq2 extends FQP {
	constructor(coeffs) {
		super();
		if (coeffs.length !== 2)
			throw new Error(`Expected array with 2 elements`);
		coeffs.forEach((c, i) => {
			if (typeof c === 'bigint')
				coeffs[i] = new Fq(c);
		});
		this.c = coeffs;
	}
	init(tuple) {
		return new Fq2(tuple);
	}
	toString() {
		return `Fq2(${this.c[0]} + ${this.c[1]}×i)`;
	}
	get values() {
		return this.c.map((c) => c.value);
	}
	multiply(rhs) {
		if (typeof rhs === 'bigint')
			return new Fq2(this.map((c) => c.multiply(rhs)));
		const [c0, c1] = this.c;
		const [r0, r1] = rhs.c;
		let t1 = c0.multiply(r0);
		let t2 = c1.multiply(r1);
		return new Fq2([t1.subtract(t2), c0.add(c1).multiply(r0.add(r1)).subtract(t1.add(t2))]);
	}
	mulByNonresidue() {
		const c0 = this.c[0];
		const c1 = this.c[1];
		return new Fq2([c0.subtract(c1), c0.add(c1)]);
	}
	square() {
		const c0 = this.c[0];
		const c1 = this.c[1];
		const a = c0.add(c1);
		const b = c0.subtract(c1);
		const c = c0.add(c0);
		return new Fq2([a.multiply(b), c.multiply(c1)]);
	}
	sqrt() {
		const candidateSqrt = this.pow((Fq2.ORDER + 8n) / 16n);
		const check = candidateSqrt.square().div(this);
		const R = Fq2.ROOTS_OF_UNITY;
		const divisor = [R[0], R[2], R[4], R[6]].find((r) => r.equals(check));
		if (!divisor)
			return;
		const index = R.indexOf(divisor);
		const root = R[index / 2];
		if (!root)
			throw new Error('Invalid root');
		const x1 = candidateSqrt.div(root);
		const x2 = x1.negate();
		const [re1, im1] = x1.values;
		const [re2, im2] = x2.values;
		if (im1 > im2 || (im1 === im2 && re1 > re2))
			return x1;
		return x2;
	}
	invert() {
		const [a, b] = this.values;
		const factor = new Fq(a * a + b * b).invert();
		return new Fq2([factor.multiply(new Fq(a)), factor.multiply(new Fq(-b))]);
	}
	frobeniusMap(power) {
		return new Fq2([this.c[0], this.c[1].multiply(Fq2.FROBENIUS_COEFFICIENTS[power % 2])]);
	}
	multiplyByB() {
		let [c0, c1] = this.c;
		let t0 = c0.multiply(4n);
		let t1 = c1.multiply(4n);
		return new Fq2([t0.subtract(t1), t0.add(t1)]);
	}
}
math_2.Fq2 = Fq2;
Fq2.ORDER = math_2.CURVE.P2;
Fq2.MAX_BITS = bitLen(math_2.CURVE.P2);
Fq2.ROOT = new Fq(-1n);
Fq2.ZERO = new Fq2([0n, 0n]);
Fq2.ONE = new Fq2([1n, 0n]);
Fq2.COFACTOR = math_2.CURVE.h2;
Fq2.ROOTS_OF_UNITY = [
	new Fq2([1n, 0n]),
	new Fq2([rv1, -rv1]),
	new Fq2([0n, 1n]),
	new Fq2([rv1, rv1]),
	new Fq2([-1n, 0n]),
	new Fq2([-rv1, rv1]),
	new Fq2([0n, -1n]),
	new Fq2([-rv1, -rv1]),
];
Fq2.ETAs = [
	new Fq2([ev1, ev2]),
	new Fq2([-ev2, ev1]),
	new Fq2([ev3, ev4]),
	new Fq2([-ev4, ev3]),
];
Fq2.FROBENIUS_COEFFICIENTS = [
	new Fq(0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001n),
	new Fq(0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaan),
];
class Fq6 extends FQP {
	constructor(c) {
		super();
		this.c = c;
		if (c.length !== 3)
			throw new Error(`Expected array with 3 elements`);
	}
	static fromTuple(t) {
		return new Fq6([new Fq2(t.slice(0, 2)), new Fq2(t.slice(2, 4)), new Fq2(t.slice(4, 6))]);
	}
	init(triple) {
		return new Fq6(triple);
	}
	toString() {
		return `Fq6(${this.c[0]} + ${this.c[1]} * v, ${this.c[2]} * v^2)`;
	}
	conjugate() {
		throw new TypeError('No conjugate on Fq6');
	}
	multiply(rhs) {
		if (typeof rhs === 'bigint')
			return new Fq6([this.c[0].multiply(rhs), this.c[1].multiply(rhs), this.c[2].multiply(rhs)]);
		let [c0, c1, c2] = this.c;
		const [r0, r1, r2] = rhs.c;
		let t0 = c0.multiply(r0);
		let t1 = c1.multiply(r1);
		let t2 = c2.multiply(r2);
		return new Fq6([
			t0.add(c1.add(c2).multiply(r1.add(r2)).subtract(t1.add(t2)).mulByNonresidue()),
			c0.add(c1).multiply(r0.add(r1)).subtract(t0.add(t1)).add(t2.mulByNonresidue()),
			t1.add(c0.add(c2).multiply(r0.add(r2)).subtract(t0.add(t2))),
		]);
	}
	mulByNonresidue() {
		return new Fq6([this.c[2].mulByNonresidue(), this.c[0], this.c[1]]);
	}
	multiplyBy1(b1) {
		return new Fq6([
			this.c[2].multiply(b1).mulByNonresidue(),
			this.c[0].multiply(b1),
			this.c[1].multiply(b1),
		]);
	}
	multiplyBy01(b0, b1) {
		let [c0, c1, c2] = this.c;
		let t0 = c0.multiply(b0);
		let t1 = c1.multiply(b1);
		return new Fq6([
			c1.add(c2).multiply(b1).subtract(t1).mulByNonresidue().add(t0),
			b0.add(b1).multiply(c0.add(c1)).subtract(t0).subtract(t1),
			c0.add(c2).multiply(b0).subtract(t0).add(t1),
		]);
	}
	multiplyByFq2(rhs) {
		return new Fq6(this.map((c) => c.multiply(rhs)));
	}
	square() {
		let [c0, c1, c2] = this.c;
		let t0 = c0.square();
		let t1 = c0.multiply(c1).multiply(2n);
		let t3 = c1.multiply(c2).multiply(2n);
		let t4 = c2.square();
		return new Fq6([
			t3.mulByNonresidue().add(t0),
			t4.mulByNonresidue().add(t1),
			t1.add(c0.subtract(c1).add(c2).square()).add(t3).subtract(t0).subtract(t4),
		]);
	}
	invert() {
		let [c0, c1, c2] = this.c;
		let t0 = c0.square().subtract(c2.multiply(c1).mulByNonresidue());
		let t1 = c2.square().mulByNonresidue().subtract(c0.multiply(c1));
		let t2 = c1.square().subtract(c0.multiply(c2));
		let t4 = c2.multiply(t1).add(c1.multiply(t2)).mulByNonresidue().add(c0.multiply(t0)).invert();
		return new Fq6([t4.multiply(t0), t4.multiply(t1), t4.multiply(t2)]);
	}
	frobeniusMap(power) {
		return new Fq6([
			this.c[0].frobeniusMap(power),
			this.c[1].frobeniusMap(power).multiply(Fq6.FROBENIUS_COEFFICIENTS_1[power % 6]),
			this.c[2].frobeniusMap(power).multiply(Fq6.FROBENIUS_COEFFICIENTS_2[power % 6]),
		]);
	}
}
math_2.Fq6 = Fq6;
Fq6.ZERO = new Fq6([Fq2.ZERO, Fq2.ZERO, Fq2.ZERO]);
Fq6.ONE = new Fq6([Fq2.ONE, Fq2.ZERO, Fq2.ZERO]);
Fq6.FROBENIUS_COEFFICIENTS_1 = [
	new Fq2([
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001n,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
		0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn,
	]),
	new Fq2([
		0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffen,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001n,
	]),
	new Fq2([
		0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
		0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffen,
	]),
];
Fq6.FROBENIUS_COEFFICIENTS_2 = [
	new Fq2([
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001n,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaadn,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaan,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffen,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffeffffn,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
];
class Fq12 extends FQP {
	constructor(c) {
		super();
		this.c = c;
		if (c.length !== 2)
			throw new Error(`Expected array with 2 elements`);
	}
	static fromTuple(t) {
		return new Fq12([
			Fq6.fromTuple(t.slice(0, 6)),
			Fq6.fromTuple(t.slice(6, 12)),
		]);
	}
	init(c) {
		return new Fq12(c);
	}
	toString() {
		return `Fq12(${this.c[0]} + ${this.c[1]} * w)`;
	}
	multiply(rhs) {
		if (typeof rhs === 'bigint')
			return new Fq12([this.c[0].multiply(rhs), this.c[1].multiply(rhs)]);
		let [c0, c1] = this.c;
		const [r0, r1] = rhs.c;
		let t1 = c0.multiply(r0);
		let t2 = c1.multiply(r1);
		return new Fq12([
			t1.add(t2.mulByNonresidue()),
			c0.add(c1).multiply(r0.add(r1)).subtract(t1.add(t2)),
		]);
	}
	multiplyBy014(o0, o1, o4) {
		let [c0, c1] = this.c;
		let [t0, t1] = [c0.multiplyBy01(o0, o1), c1.multiplyBy1(o4)];
		return new Fq12([
			t1.mulByNonresidue().add(t0),
			c1.add(c0).multiplyBy01(o0, o1.add(o4)).subtract(t0).subtract(t1),
		]);
	}
	multiplyByFq2(rhs) {
		return this.init(this.map((c) => c.multiplyByFq2(rhs)));
	}
	square() {
		let [c0, c1] = this.c;
		let ab = c0.multiply(c1);
		return new Fq12([
			c1.mulByNonresidue().add(c0).multiply(c0.add(c1)).subtract(ab).subtract(ab.mulByNonresidue()),
			ab.add(ab),
		]);
	}
	invert() {
		let [c0, c1] = this.c;
		let t = c0.square().subtract(c1.square().mulByNonresidue()).invert();
		return new Fq12([c0.multiply(t), c1.multiply(t).negate()]);
	}
	frobeniusMap(power) {
		const [c0, c1] = this.c;
		let r0 = c0.frobeniusMap(power);
		let [c1_0, c1_1, c1_2] = c1.frobeniusMap(power).c;
		return new Fq12([
			r0,
			new Fq6([
				c1_0.multiply(Fq12.FROBENIUS_COEFFICIENTS[power % 12]),
				c1_1.multiply(Fq12.FROBENIUS_COEFFICIENTS[power % 12]),
				c1_2.multiply(Fq12.FROBENIUS_COEFFICIENTS[power % 12]),
			]),
		]);
	}
	Fq4Square(a, b) {
		const a2 = a.square(),
			b2 = b.square();
		return [
			b2.mulByNonresidue().add(a2),
			a.add(b).square().subtract(a2).subtract(b2),
		];
	}
	cyclotomicSquare() {
		const [c0, c1] = this.c;
		const [c0c0, c0c1, c0c2] = c0.c;
		const [c1c0, c1c1, c1c2] = c1.c;
		let [t3, t4] = this.Fq4Square(c0c0, c1c1);
		let [t5, t6] = this.Fq4Square(c1c0, c0c2);
		let [t7, t8] = this.Fq4Square(c0c1, c1c2);
		let t9 = t8.mulByNonresidue();
		return new Fq12([
			new Fq6([
				t3.subtract(c0c0).multiply(2n).add(t3),
				t5.subtract(c0c1).multiply(2n).add(t5),
				t7.subtract(c0c2).multiply(2n).add(t7),
			]),
			new Fq6([
				t9.add(c1c0).multiply(2n).add(t9),
				t4.add(c1c1).multiply(2n).add(t4),
				t6.add(c1c2).multiply(2n).add(t6),
			]),
		]);
	}
	cyclotomicExp(n) {
		let z = Fq12.ONE;
		for (let i = BLS_X_LEN - 1; i >= 0; i--) {
			z = z.cyclotomicSquare();
			if (bitGet(n, i))
				z = z.multiply(this);
		}
		return z;
	}
	finalExponentiate() {
		const {
			x
		} = math_2.CURVE;
		const t0 = this.frobeniusMap(6).div(this);
		const t1 = t0.frobeniusMap(2).multiply(t0);
		const t2 = t1.cyclotomicExp(x).conjugate();
		const t3 = t1.cyclotomicSquare().conjugate().multiply(t2);
		const t4 = t3.cyclotomicExp(x).conjugate();
		const t5 = t4.cyclotomicExp(x).conjugate();
		const t6 = t5.cyclotomicExp(x).conjugate().multiply(t2.cyclotomicSquare());
		const t7 = t6.cyclotomicExp(x).conjugate();
		const t2_t5_pow_q2 = t2.multiply(t5).frobeniusMap(2);
		const t4_t1_pow_q3 = t4.multiply(t1).frobeniusMap(3);
		const t6_t1c_pow_q1 = t6.multiply(t1.conjugate()).frobeniusMap(1);
		const t7_t3c_t1 = t7.multiply(t3.conjugate()).multiply(t1);
		return t2_t5_pow_q2.multiply(t4_t1_pow_q3).multiply(t6_t1c_pow_q1).multiply(t7_t3c_t1);
	}
}
math_2.Fq12 = Fq12;
Fq12.ZERO = new Fq12([Fq6.ZERO, Fq6.ZERO]);
Fq12.ONE = new Fq12([Fq6.ONE, Fq6.ZERO]);
Fq12.FROBENIUS_COEFFICIENTS = [
	new Fq2([
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001n,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x1904d3bf02bb0667c231beb4202c0d1f0fd603fd3cbd5f4f7b2443d784bab9c4f67ea53d63e7813d8d0775ed92235fb8n,
		0x00fc3e2b36c4e03288e9e902231f9fb854a14787b6c7b36fec0c8ec971f63c5f282d5ac14d6c7ec22cf78a126ddc4af3n,
	]),
	new Fq2([
		0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffeffffn,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x135203e60180a68ee2e9c448d77a2cd91c3dedd930b1cf60ef396489f61eb45e304466cf3e67fa0af1ee7b04121bdea2n,
		0x06af0e0437ff400b6831e36d6bd17ffe48395dabc2d3435e77f76e17009241c5ee67992f72ec05f4c81084fbede3cc09n,
	]),
	new Fq2([
		0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffen,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x144e4211384586c16bd3ad4afa99cc9170df3560e77982d0db45f3536814f0bd5871c1908bd478cd1ee605167ff82995n,
		0x05b2cfd9013a5fd8df47fa6b48b1e045f39816240c0b8fee8beadf4d8e9c0566c63a3e6e257f87329b18fae980078116n,
	]),
	new Fq2([
		0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaan,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x00fc3e2b36c4e03288e9e902231f9fb854a14787b6c7b36fec0c8ec971f63c5f282d5ac14d6c7ec22cf78a126ddc4af3n,
		0x1904d3bf02bb0667c231beb4202c0d1f0fd603fd3cbd5f4f7b2443d784bab9c4f67ea53d63e7813d8d0775ed92235fb8n,
	]),
	new Fq2([
		0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x06af0e0437ff400b6831e36d6bd17ffe48395dabc2d3435e77f76e17009241c5ee67992f72ec05f4c81084fbede3cc09n,
		0x135203e60180a68ee2e9c448d77a2cd91c3dedd930b1cf60ef396489f61eb45e304466cf3e67fa0af1ee7b04121bdea2n,
	]),
	new Fq2([
		0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaadn,
		0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n,
	]),
	new Fq2([
		0x05b2cfd9013a5fd8df47fa6b48b1e045f39816240c0b8fee8beadf4d8e9c0566c63a3e6e257f87329b18fae980078116n,
		0x144e4211384586c16bd3ad4afa99cc9170df3560e77982d0db45f3536814f0bd5871c1908bd478cd1ee605167ff82995n,
	]),
];
class ProjectivePoint {
	constructor(x, y, z, C) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.C = C;
	}
	isZero() {
		return this.z.isZero();
	}
	getPoint(x, y, z) {
		return new this.constructor(x, y, z);
	}
	getZero() {
		return this.getPoint(this.C.ONE, this.C.ONE, this.C.ZERO);
	}
	equals(rhs) {
		if (this.constructor !== rhs.constructor)
			throw new Error(`ProjectivePoint#equals: this is ${this.constructor}, but rhs is ${rhs.constructor}`);
		const a = this;
		const b = rhs;
		const xe = a.x.multiply(b.z).equals(b.x.multiply(a.z));
		const ye = a.y.multiply(b.z).equals(b.y.multiply(a.z));
		return xe && ye;
	}
	negate() {
		return this.getPoint(this.x, this.y.negate(), this.z);
	}
	toString(isAffine = true) {
		if (!isAffine) {
			return `Point<x=${this.x}, y=${this.y}, z=${this.z}>`;
		}
		const [x, y] = this.toAffine();
		return `Point<x=${x}, y=${y}>`;
	}
	fromAffineTuple(xy) {
		return this.getPoint(xy[0], xy[1], this.C.ONE);
	}
	toAffine(invZ = this.z.invert()) {
		return [this.x.multiply(invZ), this.y.multiply(invZ)];
	}
	toAffineBatch(points) {
		const toInv = genInvertBatch(this.C, points.map((p) => p.z));
		return points.map((p, i) => p.toAffine(toInv[i]));
	}
	normalizeZ(points) {
		return this.toAffineBatch(points).map((t) => this.fromAffineTuple(t));
	}
	double() {
		const {
			x,
			y,
			z
		} = this;
		const W = x.multiply(x).multiply(3n);
		const S = y.multiply(z);
		const SS = S.multiply(S);
		const SSS = SS.multiply(S);
		const B = x.multiply(y).multiply(S);
		const H = W.multiply(W).subtract(B.multiply(8n));
		const X3 = H.multiply(S).multiply(2n);
		const Y3 = W.multiply(B.multiply(4n).subtract(H)).subtract(y.multiply(y).multiply(8n).multiply(SS));
		const Z3 = SSS.multiply(8n);
		return this.getPoint(X3, Y3, Z3);
	}
	add(rhs) {
		if (this.constructor !== rhs.constructor)
			throw new Error(`ProjectivePoint#add: this is ${this.constructor}, but rhs is ${rhs.constructor}`);
		const p1 = this;
		const p2 = rhs;
		if (p1.isZero())
			return p2;
		if (p2.isZero())
			return p1;
		const X1 = p1.x;
		const Y1 = p1.y;
		const Z1 = p1.z;
		const X2 = p2.x;
		const Y2 = p2.y;
		const Z2 = p2.z;
		const U1 = Y2.multiply(Z1);
		const U2 = Y1.multiply(Z2);
		const V1 = X2.multiply(Z1);
		const V2 = X1.multiply(Z2);
		if (V1.equals(V2) && U1.equals(U2))
			return this.double();
		if (V1.equals(V2))
			return this.getZero();
		const U = U1.subtract(U2);
		const V = V1.subtract(V2);
		const VV = V.multiply(V);
		const VVV = VV.multiply(V);
		const V2VV = V2.multiply(VV);
		const W = Z1.multiply(Z2);
		const A = U.multiply(U).multiply(W).subtract(VVV).subtract(V2VV.multiply(2n));
		const X3 = V.multiply(A);
		const Y3 = U.multiply(V2VV.subtract(A)).subtract(VVV.multiply(U2));
		const Z3 = VVV.multiply(W);
		return this.getPoint(X3, Y3, Z3);
	}
	subtract(rhs) {
		if (this.constructor !== rhs.constructor)
			throw new Error(`ProjectivePoint#subtract: this is ${this.constructor}, but rhs is ${rhs.constructor}`);
		return this.add(rhs.negate());
	}
	multiplyUnsafe(scalar) {
		let n = scalar;
		if (n instanceof Fq)
			n = n.value;
		if (typeof n === 'number')
			n = BigInt(n);
		if (n <= 0) {
			throw new Error('Point#multiply: invalid scalar, expected positive integer');
		}
		let p = this.getZero();
		let d = this;
		while (n > 0n) {
			if (n & 1n)
				p = p.add(d);
			d = d.double();
			n >>= 1n;
		}
		return p;
	}
	multiply(scalar) {
		let n = scalar;
		if (typeof n !== 'bigint' || n <= 0) {
			throw new Error('Point#multiply: invalid scalar, expected positive integer');
		}
		let p = this.getZero();
		let d = this;
		let f = this.getZero();
		let bits = Fq.ORDER;
		if (n > bits)
			throw new Error('higher:' + n);
		while (bits > 0n) {
			if (n & 1n) {
				p = p.add(d);
			} else {
				f = f.add(d);
			}
			d = d.double();
			n >>= 1n;
			bits >>= 1n;
		}
		return p;
	}
	maxBits() {
		return this.C.MAX_BITS;
	}
	precomputeWindow(W) {
		const windows = Math.ceil(this.maxBits() / W);
		const windowSize = 2 ** (W - 1);
		let points = [];
		let p = this;
		let base = p;
		for (let window = 0; window < windows; window++) {
			base = p;
			points.push(base);
			for (let i = 1; i < windowSize; i++) {
				base = base.add(p);
				points.push(base);
			}
			p = base.double();
		}
		return points;
	}
	calcMultiplyPrecomputes(W) {
		if (this._MPRECOMPUTES)
			throw new Error('This point already has precomputes');
		this._MPRECOMPUTES = [W, this.normalizeZ(this.precomputeWindow(W))];
	}
	clearMultiplyPrecomputes() {
		this._MPRECOMPUTES = undefined;
	}
	wNAF(n) {
		let W, precomputes;
		if (this._MPRECOMPUTES) {
			[W, precomputes] = this._MPRECOMPUTES;
		} else {
			W = 1;
			precomputes = this.precomputeWindow(W);
		}
		let [p, f] = [this.getZero(), this.getZero()];
		const windows = Math.ceil(this.maxBits() / W);
		const windowSize = 2 ** (W - 1);
		const mask = BigInt(2 ** W - 1);
		const maxNumber = 2 ** W;
		const shiftBy = BigInt(W);
		for (let window = 0; window < windows; window++) {
			const offset = window * windowSize;
			let wbits = Number(n & mask);
			n >>= shiftBy;
			if (wbits > windowSize) {
				wbits -= maxNumber;
				n += 1n;
			}
			if (wbits === 0) {
				f = f.add(window % 2 ? precomputes[offset].negate() : precomputes[offset]);
			} else {
				const cached = precomputes[offset + Math.abs(wbits) - 1];
				p = p.add(wbits < 0 ? cached.negate() : cached);
			}
		}
		return [p, f];
	}
	multiplyPrecomputed(scalar) {
		const big = typeof scalar === 'bigint';
		if (!big || scalar < 1n) {
			throw new Error('ProjectivePoint#multiply: invalid scalar, expected positive integer');
		}
		return this.wNAF(scalar)[0];
	}
}
math_2.ProjectivePoint = ProjectivePoint;

function sgn0(x) {
	const [x0, x1] = x.values;
	const sign_0 = x0 % 2n;
	const zero_0 = x0 === 0n;
	const sign_1 = x1 % 2n;
	return BigInt(sign_0 || (zero_0 && sign_1));
}
const P_MINUS_9_DIV_16 = (math_2.CURVE.P ** 2n - 9n) / 16n;

function sqrt_div_fq2(u, v) {
	const v7 = v.pow(7n);
	const uv7 = u.multiply(v7);
	const uv15 = uv7.multiply(v7.multiply(v));
	const gamma = uv15.pow(P_MINUS_9_DIV_16).multiply(uv7);
	let success = false;
	let result = gamma;
	const positiveRootsOfUnity = Fq2.ROOTS_OF_UNITY.slice(0, 4);
	for (const root of positiveRootsOfUnity) {
		const candidate = root.multiply(gamma);
		if (candidate.pow(2n).multiply(v).subtract(u).isZero() && !success) {
			success = true;
			result = candidate;
		}
	}
	return [success, result];
}

function map_to_curve_SSWU_G2(t) {
	const iso_3_a = new Fq2([0n, 240n]);
	const iso_3_b = new Fq2([1012n, 1012n]);
	const iso_3_z = new Fq2([-2n, -1n]);
	if (Array.isArray(t))
		t = new Fq2(t);
	const t2 = t.pow(2n);
	const iso_3_z_t2 = iso_3_z.multiply(t2);
	const ztzt = iso_3_z_t2.add(iso_3_z_t2.pow(2n));
	let denominator = iso_3_a.multiply(ztzt).negate();
	let numerator = iso_3_b.multiply(ztzt.add(Fq2.ONE));
	if (denominator.isZero())
		denominator = iso_3_z.multiply(iso_3_a);
	let v = denominator.pow(3n);
	let u = numerator
		.pow(3n)
		.add(iso_3_a.multiply(numerator).multiply(denominator.pow(2n)))
		.add(iso_3_b.multiply(v));
	const [success, sqrtCandidateOrGamma] = sqrt_div_fq2(u, v);
	let y;
	if (success)
		y = sqrtCandidateOrGamma;
	const sqrtCandidateX1 = sqrtCandidateOrGamma.multiply(t.pow(3n));
	u = iso_3_z_t2.pow(3n).multiply(u);
	let success2 = false;
	for (const eta of Fq2.ETAs) {
		const etaSqrtCandidate = eta.multiply(sqrtCandidateX1);
		const temp = etaSqrtCandidate.pow(2n).multiply(v).subtract(u);
		if (temp.isZero() && !success && !success2) {
			y = etaSqrtCandidate;
			success2 = true;
		}
	}
	if (!success && !success2)
		throw new Error('Hash to Curve - Optimized SWU failure');
	if (success2)
		numerator = numerator.multiply(iso_3_z_t2);
	y = y;
	if (sgn0(t) !== sgn0(y))
		y = y.negate();
	y = y.multiply(denominator);
	return [numerator, y, denominator];
}
math_2.map_to_curve_SSWU_G2 = map_to_curve_SSWU_G2;

function isogenyMapG2(xyz) {
	const [x, y, z] = xyz;
	const mapped = [Fq2.ZERO, Fq2.ZERO, Fq2.ZERO, Fq2.ZERO];
	const zPowers = [z, z.pow(2n), z.pow(3n)];
	for (let i = 0; i < math_2.isogenyCoefficients.length; i++) {
		const k_i = math_2.isogenyCoefficients[i];
		mapped[i] = k_i.slice(-1)[0];
		const arr = k_i.slice(0, -1).reverse();
		for (let j = 0; j < arr.length; j++) {
			const k_i_j = arr[j];
			mapped[i] = mapped[i].multiply(x).add(zPowers[j].multiply(k_i_j));
		}
	}
	mapped[2] = mapped[2].multiply(y);
	mapped[3] = mapped[3].multiply(z);
	const z2 = mapped[1].multiply(mapped[3]);
	const x2 = mapped[0].multiply(mapped[3]);
	const y2 = mapped[1].multiply(mapped[2]);
	return [x2, y2, z2];
}
math_2.isogenyMapG2 = isogenyMapG2;

function calcPairingPrecomputes(x, y) {
	const [Qx, Qy, Qz] = [x, y, Fq2.ONE];
	let [Rx, Ry, Rz] = [Qx, Qy, Qz];
	let ell_coeff = [];
	for (let i = BLS_X_LEN - 2; i >= 0; i--) {
		let t0 = Ry.square();
		let t1 = Rz.square();
		let t2 = t1.multiply(3n).multiplyByB();
		let t3 = t2.multiply(3n);
		let t4 = Ry.add(Rz).square().subtract(t1).subtract(t0);
		ell_coeff.push([
			t2.subtract(t0),
			Rx.square().multiply(3n),
			t4.negate(),
		]);
		Rx = t0.subtract(t3).multiply(Rx).multiply(Ry).div(2n);
		Ry = t0.add(t3).div(2n).square().subtract(t2.square().multiply(3n));
		Rz = t0.multiply(t4);
		if (bitGet(math_2.CURVE.x, i)) {
			let t0 = Ry.subtract(Qy.multiply(Rz));
			let t1 = Rx.subtract(Qx.multiply(Rz));
			ell_coeff.push([
				t0.multiply(Qx).subtract(t1.multiply(Qy)),
				t0.negate(),
				t1,
			]);
			let t2 = t1.square();
			let t3 = t2.multiply(t1);
			let t4 = t2.multiply(Rx);
			let t5 = t3.subtract(t4.multiply(2n)).add(t0.square().multiply(Rz));
			Rx = t1.multiply(t5);
			Ry = t4.subtract(t5).multiply(t0).subtract(t3.multiply(Ry));
			Rz = Rz.multiply(t3);
		}
	}
	return ell_coeff;
}
math_2.calcPairingPrecomputes = calcPairingPrecomputes;

function millerLoop(ell, g1) {
	let f12 = Fq12.ONE;
	const [x, y] = g1;
	const [Px, Py] = [x, y];
	for (let j = 0, i = BLS_X_LEN - 2; i >= 0; i--, j++) {
		f12 = f12.multiplyBy014(ell[j][0], ell[j][1].multiply(Px.value), ell[j][2].multiply(Py.value));
		if (bitGet(math_2.CURVE.x, i)) {
			j += 1;
			f12 = f12.multiplyBy014(ell[j][0], ell[j][1].multiply(Px.value), ell[j][2].multiply(Py.value));
		}
		if (i !== 0)
			f12 = f12.square();
	}
	return f12.conjugate();
}
math_2.millerLoop = millerLoop;
const ut_root = new Fq6([Fq2.ZERO, Fq2.ONE, Fq2.ZERO]);
const wsq = new Fq12([ut_root, Fq6.ZERO]);
const wsq_inv = wsq.invert();
const wcu = new Fq12([Fq6.ZERO, ut_root]);
const wcu_inv = wcu.invert();

function psi(x, y) {
	const x2 = wsq_inv.multiplyByFq2(x).frobeniusMap(1).multiply(wsq).c[0].c[0];
	const y2 = wcu_inv.multiplyByFq2(y).frobeniusMap(1).multiply(wcu).c[0].c[0];
	return [x2, y2];
}
math_2.psi = psi;
const PSI2_C1 = 0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn;

function psi2(x, y) {
	return [x.multiply(PSI2_C1), y.negate()];
}
math_2.psi2 = psi2;
const xnum = [
	new Fq2([
		0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6n,
		0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6n,
	]),
	new Fq2([
		0x0n,
		0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71an,
	]),
	new Fq2([
		0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71en,
		0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38dn,
	]),
	new Fq2([
		0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1n,
		0x0n,
	]),
];
const xden = [
	new Fq2([
		0x0n,
		0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63n,
	]),
	new Fq2([
		0xcn,
		0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9fn,
	]),
	Fq2.ONE,
	Fq2.ZERO,
];
const ynum = [
	new Fq2([
		0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706n,
		0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706n,
	]),
	new Fq2([
		0x0n,
		0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97ben,
	]),
	new Fq2([
		0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71cn,
		0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38fn,
	]),
	new Fq2([
		0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10n,
		0x0n,
	]),
];
const yden = [
	new Fq2([
		0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fbn,
		0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fbn,
	]),
	new Fq2([
		0x0n,
		0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3n,
	]),
	new Fq2([
		0x12n,
		0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99n,
	]),
	new Fq2([0x1n, 0x0n]),
];
math_2.isogenyCoefficients = [xnum, xden, ynum, yden];

// CUT

const nobleBLS = {};

/*! noble-bls12-381 - MIT License (c) Paul Miller (paulmillr.com) */
nobleBLS.verifyBatch = nobleBLS.aggregateSignatures = nobleBLS.aggregatePublicKeys = nobleBLS.verify = nobleBLS.sign = nobleBLS.getPublicKey = nobleBLS.pairing = nobleBLS.PointG2 = nobleBLS.clearCofactorG2 = nobleBLS.PointG1 = nobleBLS.hash_to_field = nobleBLS.utils = nobleBLS.CURVE = nobleBLS.Fq12 = nobleBLS.Fq2 = nobleBLS.Fr = nobleBLS.Fq = nobleBLS.DST_LABEL = void 0;
const math_1 = math_2;
Object.defineProperty(nobleBLS, "Fq", {
	enumerable: true,
	get: function() {
		return math_1.Fq;
	}
});
Object.defineProperty(nobleBLS, "Fr", {
	enumerable: true,
	get: function() {
		return math_1.Fr;
	}
});
Object.defineProperty(nobleBLS, "Fq2", {
	enumerable: true,
	get: function() {
		return math_1.Fq2;
	}
});
Object.defineProperty(nobleBLS, "Fq12", {
	enumerable: true,
	get: function() {
		return math_1.Fq12;
	}
});
Object.defineProperty(nobleBLS, "CURVE", {
	enumerable: true,
	get: function() {
		return math_1.CURVE;
	}
});
const P = math_1.CURVE.P;
nobleBLS.DST_LABEL = 'BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_';
const POW_2_381 = 2n ** 381n;
const POW_2_382 = POW_2_381 * 2n;
const POW_2_383 = POW_2_382 * 2n;
const PUBLIC_KEY_LENGTH = 48;
const SHA256_DIGEST_SIZE = 32;
nobleBLS.utils = {
	async sha256(message) {
		if (typeof window == 'object' && 'crypto' in window) {
			const buffer = await window.crypto.subtle.digest('SHA-256', message.buffer);
			return new Uint8Array(buffer);
		} else if (typeof process === 'object' && 'node' in process.versions) {
			const {
				createHash
			} = require('crypto');
			const hash = createHash('sha256');
			hash.update(message);
			return Uint8Array.from(hash.digest());
		} else {
			throw new Error("The environment doesn't have sha256 function");
		}
	},
	randomPrivateKey: (bytesLength = 32) => {
		if (typeof window == 'object' && 'crypto' in window) {
			return window.crypto.getRandomValues(new Uint8Array(bytesLength));
		} else if (typeof process === 'object' && 'node' in process.versions) {
			const {
				randomBytes
			} = require('crypto');
			return new Uint8Array(randomBytes(bytesLength).buffer);
		} else {
			throw new Error("The environment doesn't have randomBytes function");
		}
	},
	mod: math_1.mod,
};

function bytesToNumberBE(bytes) {
	let value = 0n;
	for (let i = bytes.length - 1, j = 0; i >= 0; i--, j++) {
		value += (BigInt(bytes[i]) & 255n) << (8n * BigInt(j));
	}
	return value;
}

function bytesToHex(uint8a) {
	let hex = '';
	for (let i = 0; i < uint8a.length; i++) {
		hex += uint8a[i].toString(16).padStart(2, '0');
	}
	return hex;
}

function hexToBytes(hex) {
	if (typeof hex !== 'string' || hex.length % 2)
		throw new Error('Expected valid hex');
	const array = new Uint8Array(hex.length / 2);
	for (let i = 0; i < array.length; i++) {
		const j = i * 2;
		array[i] = Number.parseInt(hex.slice(j, j + 2), 16);
	}
	return array;
}

function toPaddedHex(num, padding) {
	if (num < 0n)
		throw new Error('Expected valid number');
	if (typeof padding !== 'number')
		throw new TypeError('Expected valid padding');
	return num.toString(16).padStart(padding * 2, '0');
}

function expectHex(item) {
	if (typeof item !== 'string' && !(item instanceof Uint8Array)) {
		throw new TypeError('Expected hex string or Uint8Array');
	}
}

function concatBytes(...arrays) {
	if (arrays.length === 1)
		return arrays[0];
	const length = arrays.reduce((a, arr) => a + arr.length, 0);
	const result = new Uint8Array(length);
	for (let i = 0, pad = 0; i < arrays.length; i++) {
		const arr = arrays[i];
		result.set(arr, pad);
		pad += arr.length;
	}
	return result;
}

function stringToBytes(str) {
	const bytes = new Uint8Array(str.length);
	for (let i = 0; i < str.length; i++) {
		bytes[i] = str.charCodeAt(i);
	}
	return bytes;
}

function os2ip(bytes) {
	let result = 0n;
	for (let i = 0; i < bytes.length; i++) {
		result <<= 8n;
		result += BigInt(bytes[i]);
	}
	return result;
}

function i2osp(value, length) {
	if (value < 0 || value >= 1 << (8 * length)) {
		throw new Error(`bad I2OSP call: value=${value} length=${length}`);
	}
	const res = Array.from({
		length
	}).fill(0);
	for (let i = length - 1; i >= 0; i--) {
		res[i] = value & 0xff;
		value >>>= 8;
	}
	return new Uint8Array(res);
}

function strxor(a, b) {
	const arr = new Uint8Array(a.length);
	for (let i = 0; i < a.length; i++) {
		arr[i] = a[i] ^ b[i];
	}
	return arr;
}
async function expand_message_xmd(msg, DST, len_in_bytes) {
	const H = nobleBLS.utils.sha256;
	const b_in_bytes = SHA256_DIGEST_SIZE;
	const r_in_bytes = b_in_bytes * 2;
	const ell = Math.ceil(len_in_bytes / b_in_bytes);
	if (ell > 255)
		throw new Error('Invalid xmd length');
	const DST_prime = concatBytes(DST, i2osp(DST.length, 1));
	const Z_pad = i2osp(0, r_in_bytes);
	const l_i_b_str = i2osp(len_in_bytes, 2);
	const b = new Array(ell);
	const b_0 = await H(concatBytes(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
	b[0] = await H(concatBytes(b_0, i2osp(1, 1), DST_prime));
	for (let i = 1; i <= ell; i++) {
		const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
		b[i] = await H(concatBytes(...args));
	}
	const pseudo_random_bytes = concatBytes(...b);
	return pseudo_random_bytes.slice(0, len_in_bytes);
}
async function hash_to_field(msg, degree, isRandomOracle = true) {
	const count = isRandomOracle ? 2 : 1;
	const m = degree;
	const L = 64;
	const len_in_bytes = count * m * L;
	const DST = stringToBytes(nobleBLS.DST_LABEL);
	const pseudo_random_bytes = await expand_message_xmd(msg, DST, len_in_bytes);
	const u = new Array(count);
	for (let i = 0; i < count; i++) {
		const e = new Array(m);
		for (let j = 0; j < m; j++) {
			const elm_offset = L * (j + i * m);
			const tv = pseudo_random_bytes.slice(elm_offset, elm_offset + L);
			e[j] = math_1.mod(os2ip(tv), math_1.CURVE.P);
		}
		u[i] = e;
	}
	return u;
}
nobleBLS.hash_to_field = hash_to_field;

function normalizePrivKey(key) {
	let int;
	if (key instanceof Uint8Array && key.length === 32)
		int = bytesToNumberBE(key);
	else if (typeof key === 'string' && key.length === 64)
		int = BigInt(`0x${key}`);
	else if (typeof key === 'number' && key > 0 && Number.isSafeInteger(key))
		int = BigInt(key);
	else if (typeof key === 'bigint' && key > 0n)
		int = key;
	else
		throw new TypeError('Expected valid private key');
	int = math_1.mod(int, math_1.CURVE.r);
	if (int < 1n)
		throw new Error('Private key must be 0 < key < CURVE.r');
	return int;
}
class PointG1 extends math_1.ProjectivePoint {
	constructor(x, y, z) {
		super(x, y, z, math_1.Fq);
	}
	static fromHex(bytes) {
		expectHex(bytes);
		if (typeof bytes === 'string')
			bytes = hexToBytes(bytes);
		let point;
		if (bytes.length === 48) {
			const compressedValue = bytesToNumberBE(bytes);
			const bflag = math_1.mod(compressedValue, POW_2_383) / POW_2_382;
			if (bflag === 1n) {
				return this.ZERO;
			}
			const x = math_1.mod(compressedValue, POW_2_381);
			const fullY = math_1.mod(x ** 3n + new math_1.Fq(math_1.CURVE.b).value, P);
			let y = math_1.powMod(fullY, (P + 1n) / 4n, P);
			if (math_1.powMod(y, 2n, P) - fullY !== 0n) {
				throw new Error('The given point is not on G1: y**2 = x**3 + b');
			}
			const aflag = math_1.mod(compressedValue, POW_2_382) / POW_2_381;
			if ((y * 2n) / P !== aflag) {
				y = P - y;
			}
			point = new PointG1(new math_1.Fq(x), new math_1.Fq(y), new math_1.Fq(1n));
		} else if (bytes.length === 96) {
			if ((bytes[0] & (1 << 6)) !== 0) {
				return PointG1.ZERO;
			}
			const x = bytesToNumberBE(bytes.slice(0, PUBLIC_KEY_LENGTH));
			const y = bytesToNumberBE(bytes.slice(PUBLIC_KEY_LENGTH));
			point = new PointG1(new math_1.Fq(x), new math_1.Fq(y), math_1.Fq.ONE);
		} else {
			throw new Error('Invalid point G1, expected 48/96 bytes');
		}
		point.assertValidity();
		return point;
	}
	static fromPrivateKey(privateKey) {
		return this.BASE.multiplyPrecomputed(normalizePrivKey(privateKey));
	}
	toRawBytes(isCompressed = false) {
		return hexToBytes(this.toHex(isCompressed));
	}
	toHex(isCompressed = false) {
		if (isCompressed) {
			let hex;
			if (this.equals(PointG1.ZERO)) {
				hex = POW_2_383 + POW_2_382;
			} else {
				const [x, y] = this.toAffine();
				const flag = (y.value * 2n) / P;
				hex = x.value + flag * POW_2_381 + POW_2_383;
			}
			return toPaddedHex(hex, PUBLIC_KEY_LENGTH);
		} else {
			if (this.equals(PointG1.ZERO)) {
				return '4'.padEnd(2 * 2 * PUBLIC_KEY_LENGTH, '0');
			} else {
				const [x, y] = this.toAffine();
				return toPaddedHex(x.value, PUBLIC_KEY_LENGTH) + toPaddedHex(y.value, PUBLIC_KEY_LENGTH);
			}
		}
	}
	assertValidity() {
		const b = new math_1.Fq(math_1.CURVE.b);
		if (this.isZero())
			return;
		const {
			x,
			y,
			z
		} = this;
		const left = y.pow(2n).multiply(z).subtract(x.pow(3n));
		const right = b.multiply(z.pow(3n));
		if (!left.equals(right))
			throw new Error('Invalid point: not on curve over Fq');
	}
	toRepr() {
		return [this.x, this.y, this.z].map((v) => v.value);
	}
	millerLoop(P) {
		return math_1.millerLoop(P.pairingPrecomputes(), this.toAffine());
	}
}
nobleBLS.PointG1 = PointG1;
PointG1.BASE = new PointG1(new math_1.Fq(math_1.CURVE.Gx), new math_1.Fq(math_1.CURVE.Gy), math_1.Fq.ONE);
PointG1.ZERO = new PointG1(math_1.Fq.ONE, math_1.Fq.ONE, math_1.Fq.ZERO);

function clearCofactorG2(P) {
	const t1 = P.multiplyUnsafe(math_1.CURVE.x).negate();
	const t2 = P.fromAffineTuple(math_1.psi(...P.toAffine()));
	const p2 = P.fromAffineTuple(math_1.psi2(...P.double().toAffine()));
	return p2.subtract(t2).add(t1.add(t2).multiplyUnsafe(math_1.CURVE.x).negate()).subtract(t1).subtract(P);
}
nobleBLS.clearCofactorG2 = clearCofactorG2;
class PointG2 extends math_1.ProjectivePoint {
	constructor(x, y, z) {
		super(x, y, z, math_1.Fq2);
	}
	static async hashToCurve(msg) {
		expectHex(msg);
		if (typeof msg === 'string')
			msg = hexToBytes(msg);
		const u = await hash_to_field(msg, 2);
		const Q0 = new PointG2(...math_1.isogenyMapG2(math_1.map_to_curve_SSWU_G2(u[0])));
		const Q1 = new PointG2(...math_1.isogenyMapG2(math_1.map_to_curve_SSWU_G2(u[1])));
		const R = Q0.add(Q1);
		const P = clearCofactorG2(R);
		return P;
	}
	static fromSignature(hex) {
		expectHex(hex);
		if (typeof hex === 'string')
			hex = hexToBytes(hex);
		const half = hex.length / 2;
		if (half !== 48 && half !== 96)
			throw new Error('Invalid compressed signature length, must be 96 or 192');
		const z1 = bytesToNumberBE(hex.slice(0, half));
		const z2 = bytesToNumberBE(hex.slice(half));
		const bflag1 = math_1.mod(z1, POW_2_383) / POW_2_382;
		if (bflag1 === 1n)
			return this.ZERO;
		const x1 = z1 % POW_2_381;
		const x2 = z2;
		const x = new math_1.Fq2([x2, x1]);
		let y = x.pow(3n).add(new math_1.Fq2(math_1.CURVE.b2)).sqrt();
		if (!y)
			throw new Error('Failed to find a square root');
		const [y0, y1] = y.values;
		const aflag1 = (z1 % POW_2_382) / POW_2_381;
		const isGreater = y1 > 0n && (y1 * 2n) / P !== aflag1;
		const isZero = y1 === 0n && (y0 * 2n) / P !== aflag1;
		if (isGreater || isZero)
			y = y.multiply(-1n);
		const point = new PointG2(x, y, math_1.Fq2.ONE);
		point.assertValidity();
		return point;
	}
	static fromHex(bytes) {
		expectHex(bytes);
		if (typeof bytes === 'string')
			bytes = hexToBytes(bytes);
		let point;
		if (bytes.length === 96) {
			throw new Error('Compressed format not supported yet.');
		} else if (bytes.length === 192) {
			if ((bytes[0] & (1 << 6)) !== 0) {
				return PointG2.ZERO;
			}
			const x1 = bytesToNumberBE(bytes.slice(0, PUBLIC_KEY_LENGTH));
			const x0 = bytesToNumberBE(bytes.slice(PUBLIC_KEY_LENGTH, 2 * PUBLIC_KEY_LENGTH));
			const y1 = bytesToNumberBE(bytes.slice(2 * PUBLIC_KEY_LENGTH, 3 * PUBLIC_KEY_LENGTH));
			const y0 = bytesToNumberBE(bytes.slice(3 * PUBLIC_KEY_LENGTH));
			point = new PointG2(new math_1.Fq2([x0, x1]), new math_1.Fq2([y0, y1]), math_1.Fq2.ONE);
		} else {
			throw new Error('Invalid uncompressed point G2, expected 192 bytes');
		}
		point.assertValidity();
		return point;
	}
	static fromPrivateKey(privateKey) {
		return this.BASE.multiplyPrecomputed(normalizePrivKey(privateKey));
	}
	toSignature() {
		if (this.equals(PointG2.ZERO)) {
			const sum = POW_2_383 + POW_2_382;
			return toPaddedHex(sum, PUBLIC_KEY_LENGTH) + toPaddedHex(0n, PUBLIC_KEY_LENGTH);
		}
		this.assertValidity();
		const [
			[x0, x1],
			[y0, y1]
		] = this.toAffine().map((a) => a.values);
		const tmp = y1 > 0n ? y1 * 2n : y0 * 2n;
		const aflag1 = tmp / math_1.CURVE.P;
		const z1 = x1 + aflag1 * POW_2_381 + POW_2_383;
		const z2 = x0;
		return toPaddedHex(z1, PUBLIC_KEY_LENGTH) + toPaddedHex(z2, PUBLIC_KEY_LENGTH);
	}
	toRawBytes(isCompressed = false) {
		return hexToBytes(this.toHex(isCompressed));
	}
	toHex(isCompressed = false) {
		if (isCompressed) {
			throw new Error('Not supported');
		} else {
			if (this.equals(PointG2.ZERO)) {
				return '4'.padEnd(2 * 4 * PUBLIC_KEY_LENGTH, '0');
			} else {
				this.assertValidity();
				const [
					[x0, x1],
					[y0, y1]
				] = this.toAffine().map((a) => a.values);
				return (toPaddedHex(x1, PUBLIC_KEY_LENGTH) +
					toPaddedHex(x0, PUBLIC_KEY_LENGTH) +
					toPaddedHex(y1, PUBLIC_KEY_LENGTH) +
					toPaddedHex(y0, PUBLIC_KEY_LENGTH));
			}
		}
	}
	assertValidity() {
		const b = new math_1.Fq2(math_1.CURVE.b2);
		if (this.isZero())
			return;
		const {
			x,
			y,
			z
		} = this;
		const left = y.pow(2n).multiply(z).subtract(x.pow(3n));
		const right = b.multiply(z.pow(3n));
		if (!left.equals(right))
			throw new Error('Invalid point: not on curve over Fq2');
	}
	toRepr() {
		return [this.x, this.y, this.z].map((v) => v.values);
	}
	clearPairingPrecomputes() {
		this._PPRECOMPUTES = undefined;
	}
	pairingPrecomputes() {
		if (this._PPRECOMPUTES)
			return this._PPRECOMPUTES;
		this._PPRECOMPUTES = math_1.calcPairingPrecomputes(...this.toAffine());
		return this._PPRECOMPUTES;
	}
}
nobleBLS.PointG2 = PointG2;
PointG2.BASE = new PointG2(new math_1.Fq2(math_1.CURVE.G2x), new math_1.Fq2(math_1.CURVE.G2y), math_1.Fq2.ONE);
PointG2.ZERO = new PointG2(math_1.Fq2.ONE, math_1.Fq2.ONE, math_1.Fq2.ZERO);

function pairing(P, Q, withFinalExponent = true) {
	if (P.isZero() || Q.isZero())
		throw new Error('No pairings at point of Infinity');
	P.assertValidity();
	Q.assertValidity();
	const looped = P.millerLoop(Q);
	return withFinalExponent ? looped.finalExponentiate() : looped;
}
nobleBLS.pairing = pairing;

function normP1(point) {
	if (point instanceof PointG1)
		return point;
	expectHex(point);
	return PointG1.fromHex(point);
}

function normP2(point) {
	if (point instanceof PointG2)
		return point;
	expectHex(point);
	return PointG2.fromSignature(point);
}
async function normP2H(point) {
	if (point instanceof PointG2)
		return point;
	expectHex(point);
	return await PointG2.hashToCurve(point);
}

function getPublicKey(privateKey) {
	const bytes = PointG1.fromPrivateKey(privateKey).toRawBytes(true);
	return typeof privateKey === 'string' ? bytesToHex(bytes) : bytes;
}
nobleBLS.getPublicKey = getPublicKey;
async function sign(message, privateKey) {
	const msgPoint = await normP2H(message);
	const sigPoint = msgPoint.multiply(normalizePrivKey(privateKey));
	if (message instanceof PointG2)
		return sigPoint;
	const bytes = sigPoint.toSignature();
	return typeof message === 'string' ? bytes : hexToBytes(bytes);
}
nobleBLS.sign = sign;
async function verify(signature, message, publicKey) {
	const P = normP1(publicKey);
	const Hm = await normP2H(message);
	const G = PointG1.BASE;
	const S = normP2(signature);
	const ePHm = pairing(P.negate(), Hm, false);
	const eGS = pairing(G, S, false);
	const exp = eGS.multiply(ePHm).finalExponentiate();
	return exp.equals(math_1.Fq12.ONE);
}
nobleBLS.verify = verify;

function aggregatePublicKeys(publicKeys) {
	if (!publicKeys.length)
		throw new Error('Expected non-empty array');
	const agg = publicKeys.map(normP1).reduce((sum, p) => sum.add(p), PointG1.ZERO);
	if (publicKeys[0] instanceof PointG1)
		return agg;
	const bytes = agg.toRawBytes(true);
	if (publicKeys[0] instanceof Uint8Array)
		return bytes;
	return bytesToHex(bytes);
}
nobleBLS.aggregatePublicKeys = aggregatePublicKeys;

function aggregateSignatures(signatures) {
	if (!signatures.length)
		throw new Error('Expected non-empty array');
	const agg = signatures.map(normP2).reduce((sum, s) => sum.add(s), PointG2.ZERO);
	if (signatures[0] instanceof PointG2)
		return agg;
	const bytes = agg.toSignature();
	if (signatures[0] instanceof Uint8Array)
		return bytes;
	return bytes;
}
nobleBLS.aggregateSignatures = aggregateSignatures;
async function verifyBatch(signature, messages, publicKeys) {
	if (!messages.length)
		throw new Error('Expected non-empty messages array');
	if (publicKeys.length !== messages.length)
		throw new Error('Pubkey count should equal msg count');
	const sig = normP2(signature);
	const nMessages = await Promise.all(messages.map(normP2H));
	const nPublicKeys = publicKeys.map(normP1);
	try {
		const paired = [];
		for (const message of new Set(nMessages)) {
			const groupPublicKey = nMessages.reduce((groupPublicKey, subMessage, i) => subMessage === message ? groupPublicKey.add(nPublicKeys[i]) : groupPublicKey, PointG1.ZERO);
			paired.push(pairing(groupPublicKey, message, false));
		}
		paired.push(pairing(PointG1.BASE.negate(), sig, false));
		const product = paired.reduce((a, b) => a.multiply(b), math_1.Fq12.ONE);
		const exp = product.finalExponentiate();
		return exp.equals(math_1.Fq12.ONE);
	} catch {
		return false;
	}
}
nobleBLS.verifyBatch = verifyBatch;
PointG1.BASE.calcMultiplyPrecomputes(4);

export { nobleBLS };

// require('___globals___');
console.log(nobleBLS, math_2);