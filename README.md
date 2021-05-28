# Signed QR Codes - ideas for a digital proof of vaccination

A while back I tried to come up with how I would make a tamper-proof certificate in form of a QR code. I even [wrote about it](https://oelna.de/blog/4269) (in german, sorry). Since it seemed like a reasonable idea, I thought I'd also put together a quick demo to try in the browser. This is it.

Germany (and Europe?) is currently rolling out [their proposal](https://digitaler-impfnachweis-app.de/) for a digital vaccination record, which contains a QR code that would suffice as proof to enter restaurants and shops. I don't know what's in there, but I liked the idea and tried to put something together.

[CovPass Report](https://www.thelocal.de/20210527/covpass-germany-starts-first-trial-for-new-digital-vaccination-pass/) (thelocal.de)

## Proposed flow

![](https://oelna.de/blog/wp-photos/2021-05-18/corona-impf-qr-code.png)

## What it does

Look at the [demo](https://oelna.github.io/signed-qr-codes/).
You type a string you'd like to sign, enter a "Master Secret key", which you would keep private, and hit `Generate`.
The site generates a "Master Public Key", which you can share with anyone who needs to verify the barcodes. It also generates a signature, attaches it to the message you entered and compresses the whole thing before putting it in a QR code.

If you want, you can just hit `Verify` and the site checks to see if everything worked out. To see I'm not fooling you, the text in the `Barcode data` field is editable, so you can try and change the message or signature and see, if it still checks out (heads up: it doesn't).

This is obviously a rudimentary solution that can be improved upon.

## Possible improvements

- The goal is always a smaller barcode, eg fewer pixels. So shorten the payload in any way possible
- Find a way to generate a shorter signature than BLS with 192 characters
- Use a different compression algorithm, possibly something widely available like zip or 7z
- Think about the separation character '#' and whether it's the right choice
- Make a more complete UI to enter Name, DOB, etc. in separate fields

## What I used

I used a few external resources. I modiefied each of them to varying degrees to make them valid ES Modules I could `import`. Some took only minutes, some ages.

- [Noble BLS](https://github.com/paulmillr/noble-bls12-381) (signing, verification)
- [LZString](https://pieroxy.net/blog/pages/lz-string/) (compression of the barcode payload)
- [QR Code generator](https://www.nayuki.io/page/qr-code-generator-library) (to, well, make the QR Code)
