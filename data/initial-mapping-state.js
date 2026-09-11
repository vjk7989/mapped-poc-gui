const deepFreezeMapping = (value) => {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach(deepFreezeMapping);
    Object.freeze(value);
  }
  return value;
};

window.MAPPED_POC_INITIAL_MAPPING = deepFreezeMapping({
  "version": 3,
  "geofenceOverrides": {
    "MPOC-SURVEY-001": {
      "south": 16.91211997670552,
      "west": 81.1693189531683,
      "north": 16.912846610190584,
      "east": 81.17008946279496
    },
    "MPOC-SURVEY-002": [
      {
        "latitude": 16.926400646541595,
        "longitude": 81.16419341296931
      },
      {
        "latitude": 16.926265310739726,
        "longitude": 81.16420112838733
      },
      {
        "latitude": 16.926223902747655,
        "longitude": 81.16451189210453
      },
      {
        "latitude": 16.926186117633588,
        "longitude": 81.16467816580534
      },
      {
        "latitude": 16.926152759404555,
        "longitude": 81.16481277195692
      },
      {
        "latitude": 16.926408452350913,
        "longitude": 81.1648169772848
      },
      {
        "latitude": 16.926615507250066,
        "longitude": 81.1647982018217
      },
      {
        "latitude": 16.926633029215058,
        "longitude": 81.16472832243439
      },
      {
        "latitude": 16.926655430262468,
        "longitude": 81.16465748286677
      },
      {
        "latitude": 16.926657303220576,
        "longitude": 81.16460407765776
      },
      {
        "latitude": 16.92666662171264,
        "longitude": 81.16455280357577
      },
      {
        "latitude": 16.926668242171935,
        "longitude": 81.1644948239713
      },
      {
        "latitude": 16.926669525177363,
        "longitude": 81.16443531967214
      },
      {
        "latitude": 16.92667818130131,
        "longitude": 81.16421127093658
      },
      {
        "latitude": 16.926430646555097,
        "longitude": 81.16420280070086
      }
    ],
    "MPOC-SURVEY-003": {
      "south": 16.912640916417608,
      "west": 81.16839430669755,
      "north": 16.913321356431652,
      "east": 81.16915533841839
    }
  },
  "areaOneTreePositions": {
    "TREE-0113": {
      "latitude": 16.912778663671826,
      "longitude": 81.16940111828109,
      "displayStatus": "Infected"
    },
    "TREE-0114": {
      "latitude": 16.912736834598444,
      "longitude": 81.16947353792449,
      "displayStatus": "Infected"
    },
    "TREE-0115": {
      "latitude": 16.912712455690947,
      "longitude": 81.16934613299628,
      "displayStatus": "Infected"
    },
    "TREE-0116": {
      "latitude": 16.91269577538399,
      "longitude": 81.16941184711715,
      "displayStatus": "Infected"
    },
    "TREE-0117": {
      "latitude": 16.91263546964651,
      "longitude": 81.16935820293685,
      "displayStatus": "Infected"
    },
    "TREE-0118": {
      "latitude": 16.91265856546314,
      "longitude": 81.16948963117858,
      "displayStatus": "Infected"
    },
    "TREE-0119": {
      "latitude": 16.91257773009254,
      "longitude": 81.16935686183234,
      "displayStatus": "Infected"
    },
    "TREE-0120": {
      "latitude": 16.912587994903426,
      "longitude": 81.16950304222365,
      "displayStatus": "Infected"
    },
    "TREE-0121": {
      "latitude": 16.912760892727782,
      "longitude": 81.16961904778401,
      "displayStatus": "Infected"
    },
    "TREE-0122": {
      "latitude": 16.912785271629026,
      "longitude": 81.1695439459316,
      "displayStatus": "Infected"
    },
    "TREE-0123": {
      "latitude": 16.912837878720975,
      "longitude": 81.16939776554028,
      "displayStatus": "Infected"
    },
    "TREE-0124": {
      "latitude": 16.912812216726728,
      "longitude": 81.16947018518368,
      "displayStatus": "Infected"
    },
    "TREE-0125": {
      "latitude": 16.912753194126733,
      "longitude": 81.16998919262807,
      "displayStatus": "Infected"
    },
    "TREE-0126": {
      "latitude": 16.912447816031428,
      "longitude": 81.16943263425748,
      "displayStatus": "Infected"
    },
    "TREE-0127": {
      "latitude": 16.91249914011566,
      "longitude": 81.16937630786816,
      "displayStatus": "Infected"
    },
    "TREE-0128": {
      "latitude": 16.91239649193321,
      "longitude": 81.16936289682309,
      "displayStatus": "Infected"
    },
    "TREE-0129": {
      "latitude": 16.91236954677607,
      "longitude": 81.16944872751156,
      "displayStatus": "Infected"
    },
    "TREE-0130": {
      "latitude": 16.912305391624482,
      "longitude": 81.16939910664479,
      "displayStatus": "Infected"
    },
    "TREE-0131": {
      "latitude": 16.912228405413725,
      "longitude": 81.16939910664479,
      "displayStatus": "Infected"
    },
    "TREE-0132": {
      "latitude": 16.9122438026584,
      "longitude": 81.16951444163243,
      "displayStatus": "Infected"
    },
    "TREE-0133": {
      "latitude": 16.91244011741759,
      "longitude": 81.1694903017513,
      "displayStatus": "Infected"
    },
    "TREE-0134": {
      "latitude": 16.912333619893854,
      "longitude": 81.16951310052792,
      "displayStatus": "Infected"
    },
    "TREE-0135": {
      "latitude": 16.912504272523304,
      "longitude": 81.16948091401974,
      "displayStatus": "Infected"
    },
    "TREE-0136": {
      "latitude": 16.912606920647036,
      "longitude": 81.16962977662007,
      "displayStatus": "Infected"
    },
    "TREE-0137": {
      "latitude": 16.91251197113452,
      "longitude": 81.16961904778401,
      "displayStatus": "Infected"
    },
    "TREE-0138": {
      "latitude": 16.912370829878874,
      "longitude": 81.16957881464879,
      "displayStatus": "Infected"
    },
    "TREE-0139": {
      "latitude": 16.912766025128303,
      "longitude": 81.16976388707081,
      "displayStatus": "Infected"
    },
    "TREE-0140": {
      "latitude": 16.91268903910576,
      "longitude": 81.16978266253392,
      "displayStatus": "Infected"
    },
    "TREE-0141": {
      "latitude": 16.912570993810096,
      "longitude": 81.16974108829419,
      "displayStatus": "Infected"
    },
    "TREE-0142": {
      "latitude": 16.912504272523304,
      "longitude": 81.16971963062207,
      "displayStatus": "Infected"
    },
    "TREE-0143": {
      "latitude": 16.91244011741759,
      "longitude": 81.16968744411389,
      "displayStatus": "Infected"
    },
    "TREE-0144": {
      "latitude": 16.91238494400919,
      "longitude": 81.16972365393559,
      "displayStatus": "Infected"
    },
    "TREE-0145": {
      "latitude": 16.912314373347016,
      "longitude": 81.16966732754628,
      "displayStatus": "Infected"
    },
    "TREE-0146": {
      "latitude": 16.912232254725016,
      "longitude": 81.1696351410381,
      "displayStatus": "Infected"
    },
    "TREE-0147": {
      "latitude": 16.91218606298442,
      "longitude": 81.16951712384144,
      "displayStatus": "Infected"
    },
    "TREE-0148": {
      "latitude": 16.91217066573504,
      "longitude": 81.16960295452992,
      "displayStatus": "Infected"
    },
    "TREE-0149": {
      "latitude": 16.91216938263086,
      "longitude": 81.16990067973057,
      "displayStatus": "Infected"
    }
  },
  "areaTwoTreePositions": {
    "TREE-0172": {
      "latitude": 16.926447160825408,
      "longitude": 81.16425440854326,
      "displayStatus": "Suspected"
    },
    "TREE-0173": {
      "latitude": 16.92644382499956,
      "longitude": 81.16437242573991,
      "displayStatus": "Suspected"
    },
    "TREE-0174": {
      "latitude": 16.926432277936755,
      "longitude": 81.16443411654726,
      "displayStatus": "Suspected"
    },
    "TREE-0175": {
      "latitude": 16.92641046681616,
      "longitude": 81.16452665275827,
      "displayStatus": "Suspected"
    },
    "TREE-0176": {
      "latitude": 16.926411749823334,
      "longitude": 81.16457671672285,
      "displayStatus": "Suspected"
    },
    "TREE-0177": {
      "latitude": 16.926400202758547,
      "longitude": 81.16466254741133,
      "displayStatus": "Suspected"
    },
    "TREE-0178": {
      "latitude": 16.926382240656373,
      "longitude": 81.16475374251783,
      "displayStatus": "Suspected"
    },
    "TREE-0179": {
      "latitude": 16.926350165469653,
      "longitude": 81.16447479278028,
      "displayStatus": "Suspected"
    },
    "TREE-0180": {
      "latitude": 16.926284732071785,
      "longitude": 81.16455257684171,
      "displayStatus": "Suspected"
    },
    "TREE-0181": {
      "latitude": 16.92638429347597,
      "longitude": 81.16424948722303,
      "displayStatus": "Healthy"
    },
    "TREE-0182": {
      "latitude": 16.926391221707668,
      "longitude": 81.16432458907545,
      "displayStatus": "Healthy"
    },
    "TREE-0183": {
      "latitude": 16.926371976597206,
      "longitude": 81.16439566761434,
      "displayStatus": "Healthy"
    },
    "TREE-0184": {
      "latitude": 16.926334769378084,
      "longitude": 81.1645498946327,
      "displayStatus": "Healthy"
    },
    "TREE-0185": {
      "latitude": 16.926334769378084,
      "longitude": 81.16462365538061,
      "displayStatus": "Healthy"
    },
    "TREE-0186": {
      "latitude": 16.92633861840109,
      "longitude": 81.16469172581249,
      "displayStatus": "Healthy"
    },
    "TREE-0187": {
      "latitude": 16.926315524261856,
      "longitude": 81.16478694423252,
      "displayStatus": "Healthy"
    },
    "TREE-0188": {
      "latitude": 16.92625234393987,
      "longitude": 81.16472123011165,
      "displayStatus": "Healthy"
    },
    "TREE-0189": {
      "latitude": 16.926243876077432,
      "longitude": 81.16477621539646,
      "displayStatus": "Healthy"
    },
    "TREE-0190": {
      "latitude": 16.926305460465883,
      "longitude": 81.16448251350933,
      "displayStatus": "Healthy"
    },
    "TREE-0191": {
      "latitude": 16.9263311206218,
      "longitude": 81.16436449631267,
      "displayStatus": "Healthy"
    },
    "TREE-0192": {
      "latitude": 16.926327271598627,
      "longitude": 81.16430146440082,
      "displayStatus": "Healthy"
    },
    "TREE-0193": {
      "latitude": 16.92628165286034,
      "longitude": 81.1646406466414,
      "displayStatus": "Suspected"
    }
  },
  "areaThreeTreePositions": {
    "TREE-0201": {
      "latitude": 16.9127164333102,
      "longitude": 81.16844625191271,
      "displayStatus": "Healthy"
    },
    "TREE-0202": {
      "latitude": 16.91278418098619,
      "longitude": 81.16844893412173,
      "displayStatus": "Healthy"
    },
    "TREE-0203": {
      "latitude": 16.912871431765307,
      "longitude": 81.16845161633074,
      "displayStatus": "Healthy"
    },
    "TREE-0204": {
      "latitude": 16.912966381096684,
      "longitude": 81.16847039179385,
      "displayStatus": "Healthy"
    },
    "TREE-0205": {
      "latitude": 16.913058764183994,
      "longitude": 81.168497213884,
      "displayStatus": "Healthy"
    },
    "TREE-0206": {
      "latitude": 16.913122919079083,
      "longitude": 81.16848380283892,
      "displayStatus": "Healthy"
    },
    "TREE-0207": {
      "latitude": 16.91269949636781,
      "longitude": 81.1685347648102,
      "displayStatus": "Healthy"
    },
    "TREE-0208": {
      "latitude": 16.91270462877001,
      "longitude": 81.16861254887164,
      "displayStatus": "Healthy"
    },
    "TREE-0209": {
      "latitude": 16.91270462877001,
      "longitude": 81.16870106176913,
      "displayStatus": "Healthy"
    },
    "TREE-0210": {
      "latitude": 16.912722592176603,
      "longitude": 81.16881103233874,
      "displayStatus": "Healthy"
    },
    "TREE-0211": {
      "latitude": 16.912737989380883,
      "longitude": 81.16886735872805,
      "displayStatus": "Healthy"
    },
    "TREE-0212": {
      "latitude": 16.91278418098619,
      "longitude": 81.16895855383456,
      "displayStatus": "Healthy"
    },
    "TREE-0213": {
      "latitude": 16.91276365138522,
      "longitude": 81.16897464708865,
      "displayStatus": "Healthy"
    },
    "TREE-0214": {
      "latitude": 16.91274825418304,
      "longitude": 81.16912216858447,
      "displayStatus": "Healthy"
    },
    "TREE-0215": {
      "latitude": 16.912825240181398,
      "longitude": 81.16909802870333,
      "displayStatus": "Healthy"
    },
    "TREE-0216": {
      "latitude": 16.912902226148294,
      "longitude": 81.16905779556811,
      "displayStatus": "Healthy"
    },
    "TREE-0217": {
      "latitude": 16.912853468372912,
      "longitude": 81.16898269371569,
      "displayStatus": "Healthy"
    },
    "TREE-0218": {
      "latitude": 16.91285090217385,
      "longitude": 81.16889954523623,
      "displayStatus": "Healthy"
    },
    "TREE-0219": {
      "latitude": 16.912804710584904,
      "longitude": 81.16878421024859,
      "displayStatus": "Healthy"
    },
    "TREE-0220": {
      "latitude": 16.912794445785828,
      "longitude": 81.16871179060519,
      "displayStatus": "Healthy"
    },
    "TREE-0221": {
      "latitude": 16.91278161478619,
      "longitude": 81.1685508580643,
      "displayStatus": "Healthy"
    },
    "TREE-0222": {
      "latitude": 16.912917623337904,
      "longitude": 81.16854817585528,
      "displayStatus": "Healthy"
    },
    "TREE-0223": {
      "latitude": 16.91291249094151,
      "longitude": 81.16869033293307,
      "displayStatus": "Healthy"
    },
    "TREE-0224": {
      "latitude": 16.912974079689022,
      "longitude": 81.16866351084292,
      "displayStatus": "Healthy"
    },
    "TREE-0225": {
      "latitude": 16.913040800809448,
      "longitude": 81.16862864212573,
      "displayStatus": "Healthy"
    },
    "TREE-0226": {
      "latitude": 16.913081859948743,
      "longitude": 81.16876275257647,
      "displayStatus": "Healthy"
    },
    "TREE-0227": {
      "latitude": 16.91303566841641,
      "longitude": 81.1688405366379,
      "displayStatus": "Healthy"
    },
    "TREE-0228": {
      "latitude": 16.912945851515577,
      "longitude": 81.16885394768298,
      "displayStatus": "Healthy"
    },
    "TREE-0229": {
      "latitude": 16.912966381096684,
      "longitude": 81.16893173174441,
      "displayStatus": "Healthy"
    },
    "TREE-0230": {
      "latitude": 16.91301513884286,
      "longitude": 81.16902560905993,
      "displayStatus": "Healthy"
    },
    "TREE-0231": {
      "latitude": 16.913102389515032,
      "longitude": 81.16900683359682,
      "displayStatus": "Healthy"
    },
    "TREE-0232": {
      "latitude": 16.913081859948743,
      "longitude": 81.1689129562813,
      "displayStatus": "Healthy"
    },
    "TREE-0233": {
      "latitude": 16.91316654439527,
      "longitude": 81.16856158690035,
      "displayStatus": "Healthy"
    },
    "TREE-0234": {
      "latitude": 16.91318450775782,
      "longitude": 81.16866619305193,
      "displayStatus": "Healthy"
    },
    "TREE-0235": {
      "latitude": 16.913117786688282,
      "longitude": 81.16871983723223,
      "displayStatus": "Healthy"
    },
    "TREE-0236": {
      "latitude": 16.913138316250663,
      "longitude": 81.16877079920351,
      "displayStatus": "Healthy"
    },
    "TREE-0237": {
      "latitude": 16.913187073952333,
      "longitude": 81.1688533069476,
      "displayStatus": "Healthy"
    },
    "TREE-0238": {
      "latitude": 16.913151147226,
      "longitude": 81.16892840880001,
      "displayStatus": "Healthy"
    },
    "TREE-0239": {
      "latitude": 16.91285090217385,
      "longitude": 81.16859849709118,
      "displayStatus": "Healthy"
    },
    "TREE-0240": {
      "latitude": 16.9132634182231,
      "longitude": 81.16851733049253,
      "displayStatus": "Healthy"
    },
    "TREE-0241": {
      "latitude": 16.91322235912337,
      "longitude": 81.16858975013594,
      "displayStatus": "Healthy"
    },
    "TREE-0242": {
      "latitude": 16.91319413098711,
      "longitude": 81.16852537711958,
      "displayStatus": "Healthy"
    },
    "TREE-0243": {
      "latitude": 16.91325828583612,
      "longitude": 81.16864875873426,
      "displayStatus": "Healthy"
    },
    "TREE-0244": {
      "latitude": 16.91323775628681,
      "longitude": 81.16872117837767,
      "displayStatus": "Healthy"
    },
    "TREE-0245": {
      "latitude": 16.913273682996632,
      "longitude": 81.1688177379022,
      "displayStatus": "Healthy"
    },
    "TREE-0246": {
      "latitude": 16.913276249189927,
      "longitude": 81.16887674650053,
      "displayStatus": "Healthy"
    },
    "TREE-0247": {
      "latitude": 16.913230057705253,
      "longitude": 81.16896794160704,
      "displayStatus": "Healthy"
    },
    "TREE-0248": {
      "latitude": 16.912945209966196,
      "longitude": 81.1687453182588,
      "displayStatus": "Healthy"
    },
    "TREE-0249": {
      "latitude": 16.9128759226132,
      "longitude": 81.16883114894728,
      "displayStatus": "Healthy"
    },
    "TREE-0250": {
      "latitude": 16.912842562026743,
      "longitude": 81.16873995384077,
      "displayStatus": "Healthy"
    }
  }
});
