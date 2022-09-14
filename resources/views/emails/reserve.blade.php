@if($status === 'create')
<p class="mb-4">{{ $name }}様の予約が完了しました。</p>
@elseif($status === 'update')
<p class="mb-4">{{ $name }}様の予約が変更されました。</p>
@else
<p class="mb-4">{{ $name }}様の予約がキャンセルされました。</p>
@endif

予約情報
<ul class="mb-4">
  <li>演目名: {{$event->name}}</li>
  <li>予約人数: {{$number_of_people}}人</li>
  <li>開始時刻: {{$event->start_date}}</li>
  <li>公演場所: ******* (場所が毎回変わるのであればEventTableに場所のカラムを追加)</li>
</ul>
