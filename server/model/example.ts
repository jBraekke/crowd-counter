import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    name:    String,
    binary:  Buffer,
    living:  Boolean,
    updated: { type: Date, default: Date.now },
    age:     { type: Number, min: 18, max: 65 },
    mixed:   Schema.Types.Mixed,
    _someId: Schema.Types.ObjectId,
    decimal: Schema.Types.Decimal128,
    array: [Number],
    ofString: [String],
    ofNumber: [Number],
    ofDates: [Date],
    ofBuffer: [Buffer],
    ofBoolean: [Boolean],
    ofMixed: [Schema.Types.Mixed],
    ofObjectId: [Schema.Types.ObjectId],
    ofArrays: [[]],
    ofArrayOfNumbers: [[Number]],
    nested: {
      stuff: { type: String, lowercase: true, trim: true }
    },
    map: Map,
    mapOfString: {
      type: Map,
      of: String
    }
  })
  
  // example use
  
  const Thing = mongoose.model('Thing', schema);
  
  const m = new Thing;
  m.name = 'Statue of Liberty';
  m.age = 125;
  m.updated = new Date;
  m.binary = Buffer.alloc(0);
  m.living = false;
  m.mixed = { any: { thing: 'i want' } };
  m.markModified('mixed');
  m.array.push(1);
  m.ofString.push("strings!");
  m.ofNumber.unshift(1,2,3,4);
  m.ofBuffer.pop();
  m.ofMixed = [1, [], 'three', { four: 5 }];
  m.nested.stuff = 'good';
  m.map = new Map([['key', 'value']]);
  m.save();
  //m.save(callback);