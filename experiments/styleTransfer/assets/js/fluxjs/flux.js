flux = (function () {

let Buffer = new BSON().serialize({}).constructor

function blobAsArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.addEventListener("loadend", function() {
      resolve(reader.result);
    });
    reader.readAsArrayBuffer(blob);
  });
}

async function fetchBytes(url) {
  let resp = await fetch(url);
  if (!resp.ok) throw(resp);
  let blob = await resp.blob();
  let buf  = await blobAsArrayBuffer(blob);
  return new Buffer(buf);
}

async function fetchData(url) {
  let buf = await fetchBytes(url);
  return new BSON().deserialize(buf);
}

// `buf` is a Uint8Array from BSON
function readFloat32(buf) {
  let view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let data = new Float32Array(view.byteLength/4);
  for (let i = 0; i < data.length; i++) {
    data[i] = view.getFloat32(i*4, true);
  }
  return data;
}

function readInt32(buf) {
  let view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let data = new Int32Array(view.byteLength/4);
  for (let i = 0; i < data.length; i++) {
    data[i] = view.getInt32(i*4, true);
  }
  return data;
}

function toTensor_(spec) {
  let type = spec.type.name;
  type = type[type.length-1];
  if (type == 'Float32') spec.data = readFloat32(spec.data.buffer);
  else if (type == 'Int32') spec.data = readInt32(spec.data.buffer);
  else throw `Array type ${spec.type.name} not supported.`;
  let array = tf.tensor(spec.data, spec.size.reverse());
  return array
}

function convertArrays_(data) {
  if (!(typeof data == "object")) return data
  if (data.tag == "array") {
    return toTensor_(data);
  } else {
    for (let k of Object.keys(data)) {
      data[k] = convertArrays_(data[k])
    }
  }
  return data;
}

async function fetchBlob(url) {
  data = await fetchData(url);
  return convertArrays_(data)
}

async function fetchWeights(url) {
  ws = await fetchBlob(url);
  return ws.weights;
}

const _data = t => (t instanceof tf.Tensor)? t.dataSync(): t;
const slice = t => (t instanceof tf.Tensor)? t.clone():(
  t instanceof Array ? t.slice() : t);

return {fetchData, fetchWeights, fetchBlob, convertArrays_, data: _data, slice};

})();

// for ConvTranspose layer ( custom layer in FastStyleTransfer.jl )
function out_size(stride, pad, dilation, kernel, xdims, output_pad){
    var dims = []
  var n = (stride.length)

    for (k =0; k< n; k++) {
    var i = [0, stride[k], pad[k], dilation[k], kernel[k], xdims[k], output_pad[k]]
        dims.push(i[1] * (i[5] - 1) + (i[4] - 1) * i[3] - 2 * i[2] + 1 + i[6])
  }
    return dims
}

function ctos(x, w, stride, pad, dilation, output_pad){
  var a = out_size(stride, pad, dilation, w.shape.slice(2).reverse(), x.shape.slice(2).reverse(), output_pad)
  var b = ([...a,  w.shape[1], x.shape[0]]).reverse()
  return [b[0], b[2], b[3], b[1]]

}

flux.ctOutSize = ctos