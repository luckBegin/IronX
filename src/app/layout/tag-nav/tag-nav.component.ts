import { Component, OnInit } from '@angular/core' ;
import { Router } from '@angular/router' ;
import { EmitService } from '../../service/event-emit.service' ;
import { filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'tag-nav',
  template: `
  	<ul class = 'c-list-unstyled c-flex-row-start tag-list' *ngIf = 'tabMenu.length > 0'>
  		<li 
  			*ngFor = 'let item of tabMenu;let idx = index' 
  			class='tag-item c-flex-row-start' 
  			[ngClass] = '{"tag-item-active" : activeIndex == idx}'
  		>
  			<span (click) = 'urlTrans(item.url , idx)'>
  				{{item.title}}
  			</span>
  			<i class="anticon anticon-close" (click) = 'close(item.url , idx)'></i>
  		</li>
  	</ul>
  `,
  styles: [`
  	.tag-list{
		width: 100%;
		height: 40px;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
		line-height: 36px;
		padding: 2px 20px;
  	}
  	.tag-item{
		margin-right: 30px;
		padding: 0 3px;
		position: relative;
		cursor: pointer;
		transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  	}
  	.tag-item>i{
		margin-top: 2px;
		margin-left: 4px;
		font-size: 14px;
  	}
  	.tag-item-active,.tag-item:hover{
  		color:#1890ff ;
  	}
  	.tag-item-active::after{
  		content:"";
  		display:block;
  		width:100%;
  		height:1px;
  		position:absolute;
  		bottom:0px;
  		left:0px;
  		background:#1890ff;
  	}
  `]
})
export class TagNavComponent implements OnInit {
    constructor(
    	private emit : EmitService ,
    	private router : Router ,
    	private msg : NzMessageService
    ){
    	emit.eventEmit
    		.pipe(filter( evt => evt['type'] == 'title'))
    		.subscribe(
    			evt => {
    				let title = evt['title'] ;
    				if(!this.urlExits[title]){
    					this.tabMenu.push(evt) ;
    					this.activeIndex = this.tabMenu.length - 1 ;
    					this.urlExits[title] = this.activeIndex ;
    				}else{
    					this.activeIndex = this.urlExits[title] ;
    				}
    			}
    		)
    }
    urlExits : object = {} ;
    tabMenu : object[] = [];
    activeIndex : number = 0;
    ngOnInit(){};

    urlTrans( url : string , index : number) : void {
    	this.activeIndex = index ;
    	this.router.navigate([url]) ;
    };

    close( url : string , idx : number){
    	let tabLen = this.tabMenu.length ;
      let urlObj = this.tabMenu[this.activeIndex] ;
    	if(tabLen == 1){
	    	this.msg.create("warning", `该窗口不可关闭`);
    		return ;
    	};

      this.tabMenu.splice(idx,1);
    	if(idx == this.activeIndex){
    		this.activeIndex = this.tabMenu.length -1 ;
        let url = this.tabMenu[this.activeIndex]['url'] ;
    		this.router.navigate([url]);
        return ;
    	};

      this.tabMenu.forEach( (item,index) => {
        if(item['url'] == urlObj['url'])
          this.activeIndex = index ;
      });
    };
}
