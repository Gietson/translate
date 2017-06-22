// *********** START: webmaster configuration **************
var PREBID_TIMEOUT = 600;     // max time for prebid to complete
var pbjs_path = pbjs_path || '/static/nowywykoppl/js/yieldbird/desk/';         // update path if necessary
// *********** END: webmaster configuration **************

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

function initAdserver() {
    if (pbjs.initAdserverSet) return;

    (function() {
        var gads = document.createElement('script');
        gads.async = true;
        gads.type = 'text/javascript';
        var useSSL = 'https:' == document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') +
        '//www.googletagservices.com/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);
    })();
    pbjs.initAdserverSet = true;
};
setTimeout(initAdserver, PREBID_TIMEOUT);

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

(function() {
    var pbjsEl = document.createElement("script"); pbjsEl.type = "text/javascript";
    pbjsEl.async = true; 
    pbjsEl.src = pbjs_path + "prebid.js";
    var pbjsTargetEl = document.getElementsByTagName("head")[0];
    pbjsTargetEl.insertBefore(pbjsEl, pbjsTargetEl.firstChild);
})();

pbjs.que.push(function() {

  var adUnits = [{
    // '/52555387/wykop.pl_300x250', 
    code: 'div-gpt-ad-1467639375362-0', 
    sizes: [300, 250], 
    bids: [{
          bidder: 'appnexus',
          params: { placementId: '9029690' }
        },{
          bidder: 'wideorbit',
          params: {
              pbId: '491',
              pId: '84613249'
          }
      }]
  },{
    // '/52555387/wykop.pl_750x200', 
    code: 'div-gpt-ad-1467639375362-1',
    sizes: [750, 200], 
    bids: [{
          bidder: 'appnexus',
          params: { placementId: '9029686' }
        },{
          bidder: 'wideorbit',
          params: {
              pbId: '491',
              pId: '84613102'
          }
      }]
  },/*{
    // '/52555387/wykop.pl_970x250', 
    code: 'div-gpt-ad-1467639375362-2',
    sizes: [970, 250], 
    bids: [{
          bidder: 'appnexus',
          params: { placementId: '9029688' }
        },{
          bidder: 'wideorbit',
          params: {
              pbId: '491',
              pId: '84613248'
          }
      }]
  },*/{
    // '/52555387/wykop.pl_300x250_2', 
    code: 'div-gpt-ad-1467639375362-3',
    sizes: [300, 250], 
    bids: [{
          bidder: 'appnexus',
          params: { placementId: '9029691' }
        },{
          bidder: 'wideorbit',
          params: {
              pbId: '491',
              pId: '84613317'
          }
      }]
  },{
    // '/52555387/wykop.pl_750x200_srodtekst', 
    code: 'div-gpt-ad-1467639375362-5',
    sizes: [750, 200], 
    bids: [{
          bidder: 'appnexus',
          params: { placementId: '9311462' }
        },{
          bidder: 'wideorbit',
          params: {
              pbId: '491',
              pId: '86747564'
          }
      }]
  },{
    // '/52555387/wykop.pl_300x600_sticky', 
    code: 'div-gpt-ad-1467639375362-4',
    sizes: [300, 600], 
    bids: [{
          bidder: 'appnexus',
          params: { placementId: '9029692' }
        },{
          bidder: 'wideorbit',
          params: {
              pbId: '491',
              pId: '84613318'
          }
      }]
  }];

  pbjs.addAdUnits(adUnits);

  pbjs.addCallback('adUnitBidsBack', function(adUnitCode){
      console.log('ad unit bids back for : ' + adUnitCode);
  });

  pbjs.requestBids({
      bidsBackHandler: function(bidResponses) {
          initAdserver();
      }
  });

  pbjs.bidderSettings = {
      standard: {
          adserverTargeting: [{
              key: "hb_bidder",
              val: function(bidResponse) {
                  return bidResponse.bidderCode;
              }
          }, {
              key: "hb_adid",
              val: function(bidResponse) {
                  return bidResponse.adId;
              }
          }, {
              key: "hb_pb",
              val: function(bidResponse) {
                  return bidResponse.pbHg;
              }
          }, {
            key: "hb_size",
            val: function(bidResponse) {
                return bidResponse.size;
            }
          }]
      }
  };
  
});

// adslots setup
googletag.cmd.push(function() {

    // adslots
    googletag.defineSlot('/52555387/wykop.pl_300x250', [300, 250], 'div-gpt-ad-1467639375362-0').addService(googletag.pubads());
    googletag.defineSlot('/52555387/wykop.pl_750x200', [750, 200], 'div-gpt-ad-1467639375362-1').addService(googletag.pubads());
    googletag.defineSlot('/52555387/wykop.pl_970x250', [970, 250], 'div-gpt-ad-1467639375362-2').addService(googletag.pubads());
    googletag.defineSlot('/52555387/wykop.pl_300x250_2', [300, 250], 'div-gpt-ad-1467639375362-3').addService(googletag.pubads());
    googletag.defineSlot('/52555387/wykop.pl_300x600_sticky', [300, 600], 'div-gpt-ad-1467639375362-4').addService(googletag.pubads());
	googletag.defineSlot('/52555387/wykop.pl_750x200_srodtekst', [750, 200], 'div-gpt-ad-1467639375362-5').addService(googletag.pubads());

    pbjs.que.push(function() {
        pbjs.setTargetingForGPTAsync();
        biddbg();
    });

    //googletag.pubads().enableSingleRequest();

    if (typeof crtg_content == 'undefined') crtg_content = ''; 
    var crtg_split = crtg_content.split(';'); 
    for (var i = 1; i < crtg_split.length; i++) { 
    googletag.pubads().setTargeting("" + (crtg_split[i- 1].split('='))[0] + "", "" + (crtg_split[i - 1].split('='))[1] + ""); 
    } 
    googletag.enableServices();
});

// utils
function biddbg () {
  if(location.search.indexOf('pbjs_debug') > -1) {
    if(!document.getElementById('refresher')) {
      var refresher = document.createElement('button');
      refresher.id = 'refresher';
      refresher.innerHTML = "Refresh Bids";
      refresher.onclick = refreshBids;
      document.body.insertBefore(refresher, document.body.firstChild);
    }
    if(!document.getElementById('container')) {
      var dbg_ct = document.createElement('div');
      dbg_ct.id = "container";
      document.body.insertBefore(dbg_ct, document.body.firstChild);
    }
    var container = document.getElementById('container');
    var targetingParams = pbjs.getAdserverTargeting();
    container.innerHTML = JSON.stringify(targetingParams);
  }
}

function refreshBids() {
  pbjs.que.push(function() {
    pbjs.requestBids({
      timeout: PREBID_TIMEOUT,
      bidsBackHandler: function() {
        pbjs.setTargetingForGPTAsync();
        googletag.pubads().refresh();
        biddbg();
      }
    });
  });
}
